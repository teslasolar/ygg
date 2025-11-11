#!/usr/bin/env node
/*<!--
# Configuration Manager
Manage Yggdrasil configuration (<250 tokens)

## Commands
- `node cfg.md get KEY` - Get config value
- `node cfg.md set KEY VALUE` - Set config value
- `node cfg.md list` - List all config
- `node cfg.md export` - Export as JSON

## Config Keys
- cycles: Number of simulation cycles
- population: Max forest population
- mutation_rate: Mutation probability
- selection_rate: Evolution keep percentage
-->*/

const fs=require('fs'),path=require('path');

const CFG_FILE=path.join(__dirname,'ygg.cfg');
const PHI=(1+Math.sqrt(5))/2;

const defaults={
  cycles:100,
  population:50,
  mutation_rate:0.05,
  selection_rate:0.7,
  phi:PHI,
  inv_phi:1/PHI,
  version:'2.0.0'
};

function load(){
  if(!fs.existsSync(CFG_FILE))return{...defaults};
  const lines=fs.readFileSync(CFG_FILE,'utf8').split('\n');
  const cfg={...defaults};
  lines.forEach(line=>{
    const[k,v]=line.split('=');
    if(k&&v)cfg[k.trim()]=isNaN(v)?v.trim():parseFloat(v);
  });
  return cfg;
}

function save(cfg){
  const lines=Object.entries(cfg).map(([k,v])=>`${k}=${v}`);
  fs.writeFileSync(CFG_FILE,lines.join('\n'));
}

const[cmd,key,val]=process.argv.slice(2);
const cfg=load();

if(cmd==='get'){
  console.log(cfg[key]||'undefined');
}else if(cmd==='set'){
  cfg[key]=isNaN(val)?val:parseFloat(val);
  save(cfg);
  console.log(`✅ Set ${key}=${cfg[key]}`);
}else if(cmd==='list'){
  console.log('⚙️  Yggdrasil Config:\n');
  Object.entries(cfg).forEach(([k,v])=>{
    console.log(`  ${k.padEnd(18)} ${v}`);
  });
}else if(cmd==='export'){
  console.log(JSON.stringify(cfg,null,2));
}else{
  console.log('Usage: node cfg.md [get|set|list|export] [key] [value]');
}
