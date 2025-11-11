#!/usr/bin/env node
/*<!--
# Documentation Generator
Auto-generate docs from .md module files

## Commands
- `node docs.md list` - List all modules
- `node docs.md analyze` - Analyze token counts
- `node docs.md index` - Generate index.md

## Features
- Scans directory for .md files
- Extracts documentation from comment blocks
- Calculates token counts
- Generates module index
-->*/

const fs=require('fs'),path=require('path');

function extract(file){
  const content=fs.readFileSync(file,'utf8');
  const match=content.match(/\/\*<!--([\s\S]*?)-->\*\//);
  if(!match)return null;
  const doc=match[1].trim();
  const title=doc.match(/^#\s+(.+)$/m);
  const desc=doc.match(/^([^#\n]+)$/m);
  return{title:title?title[1]:'',desc:desc?desc[1]:'',full:doc};
}

function tokens(file){
  const content=fs.readFileSync(file,'utf8');
  return Math.ceil(content.length/4);
}

const[cmd]=process.argv.slice(2);
const files=fs.readdirSync(__dirname).filter(f=>f.endsWith('.md')&&f!=='README.md'&&f!=='docs.md');

if(cmd==='list'){
  console.log('📚 Yggdrasil Modules:\n');
  files.forEach(f=>{
    const doc=extract(path.join(__dirname,f));
    const t=tokens(path.join(__dirname,f));
    console.log(`📄 ${f.padEnd(15)} ${t} tokens - ${doc?doc.title:''}`);
  });
}else if(cmd==='analyze'){
  let total=0;
  console.log('📊 Token Analysis:\n');
  files.forEach(f=>{
    const t=tokens(path.join(__dirname,f));
    total+=t;
    const bar='█'.repeat(Math.ceil(t/10));
    console.log(`${f.padEnd(15)} ${String(t).padStart(3)} ${bar}`);
  });
  console.log(`\nTotal: ${total} tokens`);
}else if(cmd==='index'){
  let md='# 📚 Yggdrasil Module Index\n\n';
  files.forEach(f=>{
    const doc=extract(path.join(__dirname,f));
    if(doc){
      md+=`## ${f}\n${doc.full}\n\n---\n\n`;
    }
  });
  fs.writeFileSync('MODULE-INDEX.md',md);
  console.log('✅ Generated MODULE-INDEX.md');
}else{
  console.log('Usage: node docs.md [list|analyze|index]');
}
