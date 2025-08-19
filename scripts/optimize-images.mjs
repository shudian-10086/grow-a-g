import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const recipesImgDir = path.join(publicDir, 'recipes-img');
const recipesImgOptimizedDir = path.join(publicDir, 'recipes-img-optimized');

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`[Image Optimization] Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`[Image Optimization] Failed to optimize ${inputPath}:`, error);
  }
}

async function optimizeImages() {
  console.log('[Image Optimization] Starting image optimization...');

  // Optimize gag-img.jpg
  const gagImgPath = path.join(publicDir, 'gag-img.jpg');
  const gagImgWebpPath = path.join(publicDir, 'gag-img.webp');
  await optimizeImage(gagImgPath, gagImgWebpPath);

  // Create optimized recipes image directory if it doesn't exist
  await fs.mkdir(recipesImgOptimizedDir, { recursive: true });

  // Optimize recipes images
  const recipeFiles = await fs.readdir(recipesImgDir);
  for (const file of recipeFiles) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(recipesImgDir, file);
      const outputPath = path.join(recipesImgOptimizedDir, `${path.parse(file).name}.webp`);
      await optimizeImage(inputPath, outputPath);
    }
  }

  console.log('[Image Optimization] Image optimization completed.');
}

optimizeImages().catch(console.error);