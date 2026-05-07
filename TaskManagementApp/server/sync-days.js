import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define schema directly to avoid import issues in script
const taskSchema = new mongoose.Schema({
  name: String,
  folder: String,
  status: { type: String, default: 'done' },
  projectPath: String
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

async function syncDays() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Pages are in ../client/src/pages relative to server dir
    const pagesDir = path.resolve(__dirname, '../client/src/pages');
    const folders = fs.readdirSync(pagesDir).filter(f => 
      f.startsWith('Day') && fs.lstatSync(path.join(pagesDir, f)).isDirectory()
    );

    console.log(`Found folders: ${folders.join(', ')}`);

    for (const folder of folders) {
      const existing = await Task.findOne({ folder });
      if (!existing) {
        const name = folder.replace(/Day(\d+)/, 'Day $1');
        const projectPath = path.resolve(pagesDir, folder);
        
        await Task.create({
          name,
          folder,
          status: 'done', // Existing folders are assumed done
          projectPath
        });
        console.log(`Synced ${folder} to database`);
      }
    }

    console.log('Sync complete');
    process.exit(0);
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

syncDays();
