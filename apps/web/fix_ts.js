import fs from 'fs';
import path from 'path';

const storeDir = path.join(process.cwd(), 'src', 'store');
const files = fs.readdirSync(storeDir).filter(f => f.endsWith('Store.ts'));

for (const file of files) {
  const filePath = path.join(storeDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes("supabase.supabaseUrl === 'https://mock.supabase.co'")) {
    content = content.replace(/import \{ supabase \} from '\.\.\/lib\/supabase';/g, "import { supabase, isMock } from '../lib/supabase';");
    content = content.replace(/supabase\.supabaseUrl === 'https:\/\/mock\.supabase\.co'/g, "isMock");
    content = content.replace(/supabase\.supabaseUrl !== 'https:\/\/mock\.supabase\.co'/g, "!isMock");
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
