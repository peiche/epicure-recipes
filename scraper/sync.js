import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { algoliasearch } from "algoliasearch";
import 'dotenv/config'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY; 
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX;

if (!appId || !adminKey || !indexName) {
    console.error("Missing credentials. Ensure NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, and NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX are set.");
    process.exit(1);
}

const client = algoliasearch(appId, adminKey);
const recipesDirPath = path.join(__dirname, "../data/recipes");

// Adjust this size if your JSON files are very large
const BATCH_SIZE = 1000; 

async function syncToAlgolia() {
    try {
        const files = await fs.readdir(recipesDirPath);
        const allRequests = [];

        console.log(`Reading ${files.length} files from ${recipesDirPath}...`);

        for (const file of files) {
            if (path.extname(file).toLowerCase() !== '.json') continue;

            const filePath = path.join(recipesDirPath, file);
            const content = await fs.readFile(filePath, 'utf8');
            const recipeData = JSON.parse(content);

            allRequests.push({
                action: 'addObject',
                body: {
                    objectID: recipeData.slug, 
                    ...recipeData
                },
            });
        }

        if (allRequests.length === 0) {
            console.log("No records found to sync.");
            return;
        }

        console.log(`Starting sync of ${allRequests.length} records in batches of ${BATCH_SIZE}...`);

        // Chunking logic
        for (let i = 0; i < allRequests.length; i += BATCH_SIZE) {
            const chunk = allRequests.slice(i, i + BATCH_SIZE);
            const currentBatchNumber = Math.floor(i / BATCH_SIZE) + 1;
            const totalBatches = Math.ceil(allRequests.length / BATCH_SIZE);

            console.log(`Uploading batch ${currentBatchNumber}/${totalBatches}...`);

            const response = await client.batch({
                indexName,
                batchWriteParams: {
                    requests: chunk,
                }
            });

            console.log(`Batch ${currentBatchNumber} complete. (TaskID: ${response.taskID})`);
        }

        console.log("\nAll records have been synced successfully.");
        
    } catch (error) {
        console.error("Sync failed:", error.message);
    }
}

syncToAlgolia();
