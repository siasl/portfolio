import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../../SilasHowePortfolio');
const DEST_DIR = path.resolve(__dirname, '../public/assets');

// Map of folder names to cleaner project IDs
const PROJECT_MAP = {
    'DoBoard': 'do-board',
    'BookArts': 'book-arts',
    'CallLight': 'call-light',
    'Personalautomations': 'personal-automations',
    'Photography': 'photography',
    'Video': 'video',
    'XR': 'xr'
};

async function migrateAssets() {
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    const items = fs.readdirSync(SOURCE_DIR);

    for (const item of items) {
        const sourcePath = path.join(SOURCE_DIR, item);
        const stats = fs.statSync(sourcePath);

        if (stats.isDirectory()) {
            // Find matching project ID
            const projectName = Object.keys(PROJECT_MAP).find(key => item.startsWith(key));

            if (projectName) {
                const projectId = PROJECT_MAP[projectName];
                const destPath = path.join(DEST_DIR, projectId);

                console.log(`Migrating ${projectName} to ${projectId}...`);

                if (!fs.existsSync(destPath)) {
                    fs.mkdirSync(destPath, { recursive: true });
                }

                // Copy all files recursively
                fs.cpSync(sourcePath, destPath, { recursive: true });
            }
        }
    }

    console.log('Asset migration complete!');
}

migrateAssets().catch(console.error);
