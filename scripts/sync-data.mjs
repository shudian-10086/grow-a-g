#!/usr/bin/env node
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const dataDir = path.join(projectRoot, 'data')
const publicDataDir = path.join(projectRoot, 'public', 'data')

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
}

async function copyJsonFiles() {
  await ensureDir(publicDataDir)
  const entries = await fs.readdir(dataDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.json')) continue
    const src = path.join(dataDir, entry.name)
    const dest = path.join(publicDataDir, entry.name)
    await fs.copyFile(src, dest)
  }
  console.log('[sync-data] Copied JSON files from data/ to public/data/')
}

async function main() {
  const watch = process.argv.includes('--watch')
  await copyJsonFiles()
  if (watch) {
    console.log('[sync-data] Watching data/ for changes...')
    const watcher = (await import('fs')).watch(dataDir, { persistent: true }, async (eventType, filename) => {
      if (!filename || !filename.endsWith('.json')) return
      try {
        await copyJsonFiles()
      } catch (err) {
        console.error('[sync-data] Error copying files:', err)
      }
    })
    // Keep process alive
    process.stdin.resume()
  }
}

main().catch(err => {
  console.error('[sync-data] Failed:', err)
  process.exit(1)
})

