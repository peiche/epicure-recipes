import puppeteer from "puppeteer";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseWebsitePath = path.join(__dirname, "../source-archives/epicure.com");
const dataBasePath = path.join(__dirname, "../data");

const stats = {
    recipes: 0,
    images: 0,
    tags: 0,
    products: 0,
    errors: 0,
    skippedImages: 0
};

const processDir = async (dirPath) => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        protocolTimeout: 120000,
    });

    try {
        if (!existsSync(dirPath)) {
            console.log(`Directory not found: ${dirPath}`);
            return;
        }

        const files = await fs.readdir(dirPath);
        const totalFiles = files.length;
        console.log(`Found ${totalFiles} entries in ${path.basename(dirPath)}`);

        for (let i = 0; i < totalFiles; i++) {
            const file = files[i];
            const progress = `[${i + 1}/${totalFiles}]`;
            const filePath = path.join(dirPath, file, "index.html");
            
            try { await fs.access(filePath); } catch (e) { continue; }

            const page = await browser.newPage();
            await page.setJavaScriptEnabled(false);
            
            try {
                await page.goto(`file://${filePath}`, { waitUntil: "domcontentloaded" });

                const data = await page.evaluate(() => {
                    const scripts = document.querySelectorAll('script');
                    for (const script of scripts) {
                        if (script.textContent.includes('window.APP_LOCALS = JSON.parse(')) {
                            let content = script.textContent;
                            content = content.substring('window.APP_LOCALS = JSON.parse('.length);
                            content = content.substring(0, content.length - 1);
                            return content;
                        }
                    }
                });

                if (data !== undefined) {
                    const obj = JSON.parse(JSON.parse(data)); 
                    const recipeName = Object.keys(obj.recipe)[0];
                    const recipeSource = obj.recipe[recipeName];
                    const imageData = recipeSource.largeImage;
                    
                    let hasImage = false;

                    if (imageData && imageData.url) {
                        const imageSavePath = path.join(dataBasePath, "images", imageData.name);
                        const thumbName = imageData.name.split('.')[0] + '.webp';
                        const thumbSavePath = path.join(dataBasePath, "images/thumbs", thumbName);

                        // 1. Check local full image
                        if (existsSync(imageSavePath)) {
                            hasImage = true;
                            stats.skippedImages++;

                            // Generate thumbnail if missing
                            if (!existsSync(thumbSavePath)) {
                                try {
                                    await fs.mkdir(path.dirname(thumbSavePath), { recursive: true });
                                    await sharp(imageSavePath)
                                        .resize(400, 400, { fit: 'cover', position: 'center' })
                                        .webp({ quality: 80 })
                                        .toFile(thumbSavePath);
                                } catch (err) {
                                    console.error(`Thumbnail Error for ${imageData.name}:`, err.message);
                                }
                            }
                        } else {
                            // 2. Try Original CDN (last resort)
                            try {
                                const response = await page.goto(imageData.url, { timeout: 5000 });
                                if (response && response.status() === 200) {
                                    const buffer = await response.buffer();
                                    await fs.mkdir(path.dirname(imageSavePath), { recursive: true });
                                    await fs.writeFile(imageSavePath, buffer);
                                    
                                    // Generate thumbnail from buffer
                                    await fs.mkdir(path.dirname(thumbSavePath), { recursive: true });
                                    await sharp(buffer)
                                        .resize(400, 400, { fit: 'cover' })
                                        .webp({ quality: 80 })
                                        .toFile(thumbSavePath);
                                        
                                    hasImage = true;
                                    stats.images++;
                                }
                            } catch (e) { /* CDN Dead */ }
                        }
                    }

                    const recipe = buildRecipe(recipeSource, hasImage);
                    const recipeSavePath = path.join(dataBasePath, "recipes", `${recipeName}.json`);
                    await fs.mkdir(path.dirname(recipeSavePath), { recursive: true });
                    await fs.writeFile(recipeSavePath, JSON.stringify(recipe, null, 2));
                    stats.recipes++;

                    // Save Tags
                    const tagPromises = (recipe.tags || []).map(async (tag) => {
                        const tagPath = path.join(dataBasePath, "tags", `${tag.slug}.json`);
                        await fs.mkdir(path.dirname(tagPath), { recursive: true });
                        stats.tags++;
                        return fs.writeFile(tagPath, JSON.stringify(tag, null, 2));
                    });

                    // Save Products
                    const productPromises = (recipe.products || []).map(async (product) => {
                        const prodPath = path.join(dataBasePath, "products", `${product.slug}.json`);
                        await fs.mkdir(path.dirname(prodPath), { recursive: true });
                        stats.products++;
                        return fs.writeFile(prodPath, JSON.stringify(product, null, 2));
                    });

                    await Promise.all([...tagPromises, ...productPromises]);
                    console.log(`${progress} Processed: ${recipeName}`);
                }
            } catch (err) {
                stats.errors++;
                console.error(`${progress} Failed ${file}:`, err.message);
            } finally {
                await page.close();
            }
        }
    } finally {
        await browser.close();
    }
};

const buildRecipe = (obj, hasImage) => {
    const recipe = {
        name: obj.recipeName,
        slug: obj.slug,
        description: stripHtmlTags(obj.description || ''),
        ingredients: (obj.components || [])
            .filter(c => c.type === 'recipe_ingredient')
            .map(c => ({
                name: c.name,
                quantity: c.quantity,
                additionalInstruction: c.additionalInstruction
            })),
        totalTime: obj.totalTime,
        servings: obj.servings,
        preparation: extractListItems(obj.preparation).map(s => stripHtmlTags(s)),
        tags: (obj.tags || [])
            .filter(t => t.codename && t.name)
            .map(t => ({ slug: t.codename, name: t.name })),
        nutritionalInformation: obj.nutritionalInformation,
        tips: splitParagraphs(obj.tips?.replaceAll('\n', '') || '').map(s => stripHtmlTags(s)),
        perfectlyBalanceYourPlate: stripHtmlTags(obj.perfectlyBalanceYourPlate || '')
    };

    if (hasImage) {
        recipe.image = `${obj.largeImage.name}`;
        recipe.thumbnail = `${obj.largeImage.name.split('.')[0]}.webp`;
    }

    recipe.products = (obj.products || [])
        .filter(p => p.codename && p.name)
        .map(p => {
            let summStr = '';
            p.summary?.forEach(d => {
                if (d.language === 'en-ca' || d.language === 'en-us') summStr = d.value;
            });
            return {
                slug: p.codename,
                name: p.name,
                summary: summStr !== '' ? parseHTMLString(summStr) : [],
            };
        });

    return recipe;
};

// --- Helpers ---
function stripHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '').replaceAll('&nbsp;', ' ').replaceAll('&amp;', '&').trim();
}

function splitParagraphs(str) {
    return str ? str.split(/<\/?p>/).filter(Boolean) : [];
}

function extractListItems(str) {
    if (!str) return [];
    const regex = /<li>(.*?)<\/li>/g;
    let match;
    const items = [];
    while ((match = regex.exec(str)) !== null) {
        items.push(match[1].replace(/\s+/g, ' ').trim());
    }
    return items;
}

function parseHTMLString(htmlString) {
    if (!htmlString) return [];
    const cleanedHtml = htmlString.replace(/\n/g, '');
    const result = [];
    const tagRegexes = [
        { tag: 'p', regex: /<p>(.*?)<\/p>/gi },
        { tag: 'h4', regex: /<h4>(.*?)<\/h4>/gi },
        { tag: 'ul', regex: /<ul>(.*?)<\/ul>/gi }
    ];

    for (const { tag, regex } of tagRegexes) {
        let match;
        while ((match = regex.exec(cleanedHtml)) !== null) {
            let content = match[1];
            if (tag === 'ul') {
                const listItems = [];
                const liRegex = /<li>(.*?)<\/li>/gi;
                let liMatch;
                while ((liMatch = liRegex.exec(content)) !== null) {
                    const itemText = liMatch[1].trim();
                    if (itemText) listItems.push(itemText);
                }
                if (listItems.length > 0) result.push(listItems);
            } else {
                const text = content.trim();
                if (text) result.push(text);
            }
        }
    }
    return result;
}

// --- Execution ---
const dirPaths = [
    path.join(baseWebsitePath, "en-ca/recipe"),
    path.join(baseWebsitePath, "en-us/recipe"),
];

(async () => {
    console.log("Starting scraper with thumbnail generation...");
    for (const dirPath of dirPaths) {
        console.log(`\n--- Directory: ${dirPath} ---`);
        await processDir(dirPath).catch(err => console.error("Fatal Error:", err));
    }
    
    console.log("\n" + "=".repeat(35));
    console.log("       SCRAPE SUMMARY");
    console.log("=".repeat(35));
    console.log(`Recipes Processed:  ${stats.recipes}`);
    console.log(`Products Processed: ${stats.products}`);
    console.log(`Tags Processed:     ${stats.tags}`);
    console.log(`Existing Images:    ${stats.skippedImages}`);
    console.log(`New Images Saved:   ${stats.images}`);
    console.log(`Total Errors:       ${stats.errors}`);
    console.log("=".repeat(35));
    console.log("Done.");
})();
