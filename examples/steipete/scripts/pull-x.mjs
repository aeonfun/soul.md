#!/usr/bin/env node
// Pull steipete's X corpus via surf-mcp (stdio JSON-RPC)
//   handles: steipete (main), openclaw (project)
// Usage: SURF_API_KEY=sk-surf-... node pull-x.mjs

import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const API_KEY = process.env.SURF_API_KEY || '';
if (!API_KEY) { console.error('SURF_API_KEY required'); process.exit(1); }

const HANDLES = (process.env.HANDLES || 'steipete,openclaw').split(',');
const OUT_DIR = process.env.OUT_DIR || `${process.cwd()}/data/x`;
mkdirSync(OUT_DIR, { recursive: true });

const mcp = spawn('surf-mcp', [], {
  stdio: ['pipe', 'pipe', 'inherit'],
  env: { ...process.env, SURF_API_KEY: API_KEY },
});

let nextId = 1;
const pending = new Map();
let buf = '';
mcp.stdout.on('data', (d) => {
  buf += d.toString();
  let idx;
  while ((idx = buf.indexOf('\n')) !== -1) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    try {
      const msg = JSON.parse(line);
      if (msg.id && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg);
      }
    } catch (e) { /* ignore */ }
  }
});

function call(method, params) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    mcp.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error('timeout')); }
    }, 60000);
  });
}

async function callTool(name, args) {
  const resp = await call('tools/call', { name, arguments: args });
  if (resp.error) throw new Error(JSON.stringify(resp.error));
  const content = resp.result?.content?.[0];
  if (content?.type === 'text') {
    try { return JSON.parse(content.text); } catch { return content.text; }
  }
  return resp.result;
}

async function paginate(command, baseArgs, max = 30) {
  const all = [];
  let cursor = null;
  for (let page = 0; page < max; page++) {
    const args = { ...baseArgs };
    if (cursor) args.cursor = cursor;
    const res = await callTool('surf_social', { command, params: args });
    const items = res?.data || res?.posts || res?.items || (Array.isArray(res) ? res : []);
    const newCursor = res?.cursor || res?.meta?.cursor || res?.next_cursor || null;
    console.error(`  ${command} page ${page + 1}: ${items.length} items, cursor=${newCursor ? 'YES' : 'NO'}`);
    if (items.length === 0) break;
    all.push(...items);
    if (!newCursor || newCursor === cursor) break;
    cursor = newCursor;
  }
  return all;
}

async function main() {
  await call('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'steipete-puller', version: '1.0' } });
  await call('notifications/initialized', {});

  for (const handle of HANDLES) {
    console.error(`\n=== @${handle} ===`);
    try {
      const profile = await callTool('surf_social', { command: 'user', params: { handle } });
      writeFileSync(`${OUT_DIR}/${handle}.profile.json`, JSON.stringify(profile, null, 2));
      console.error(`  profile saved`);
    } catch (e) { console.error(`  profile error: ${e.message}`); }

    try {
      const posts = await paginate('user-posts', { handle, limit: 100, filter: 'original' });
      writeFileSync(`${OUT_DIR}/${handle}.posts-original.json`, JSON.stringify(posts, null, 2));
      console.error(`  ${posts.length} original posts saved`);
    } catch (e) { console.error(`  posts error: ${e.message}`); }

    try {
      const replies = await paginate('user-replies', { handle, limit: 100 });
      writeFileSync(`${OUT_DIR}/${handle}.replies.json`, JSON.stringify(replies, null, 2));
      console.error(`  ${replies.length} replies saved`);
    } catch (e) { console.error(`  replies error: ${e.message}`); }
  }

  mcp.kill();
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
