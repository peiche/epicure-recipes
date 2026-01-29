// sync-assets.js
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// In ESM, __dirname is not defined by default, so we recreate it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPER_DATA_DIR = path.join(__dirname, 'data/images');
const NEXT_PUBLIC_DIR = path.join(__dirname, 'public/images/recipes');

async function syncImages() {
  console.log('🚀 Starting image sync...');
  
  try {
    await fs.ensureDir(NEXT_PUBLIC_DIR);
    await fs.ensureDir(path.join(NEXT_PUBLIC_DIR, 'thumbs'));

    await fs.copy(SCRAPER_DATA_DIR, NEXT_PUBLIC_DIR, { 
      overwrite: false,
      errorOnExist: false 
    });

    console.log('✅ Assets synced successfully.');
  } catch (err) {
    console.error('❌ Error syncing assets:', err);
    process.exit(1);
  }
}

syncImages();
