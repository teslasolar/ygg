#!/usr/bin/env node
/*<!--
# Markdown Loader
Browser-side executor for .md modules (<250 tokens)

## Usage
```javascript
const loader = new MarkdownLoader();
const WorldTree = await loader.load('wt.md');
const tree = new WorldTree();
```

## Features
- Fetches .md files via HTTP
- Extracts executable code from markdown
- Creates browser-compatible modules
- Caches loaded modules
-->*/

class MarkdownLoader{
  constructor(){
    this.cache={};
    this.basePath=window.location.origin+window.location.pathname.replace(/\/[^\/]*$/,'/');
  }

  async load(name){
    if(this.cache[name])return this.cache[name];

    try{
      const url=this.basePath+name;
      const resp=await fetch(url);
      if(!resp.ok)throw new Error(`Failed to load ${name}: ${resp.status}`);

      const markdown=await resp.text();
      const code=this.extract(markdown);
      const mod=this.execute(code,name);

      this.cache[name]=mod;
      console.log(`✅ Loaded: ${name}`);
      return mod;
    }catch(e){
      console.error(`❌ Error loading ${name}:`,e);
      throw e;
    }
  }

  extract(md){
    const match=md.match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/);
    if(!match)return md;

    let code=match[1].trim();
    code=code.replace(/const fs=require\('fs'\),path=require\('path'\);?/g,'');
    code=code.replace(/const (\w+)=eval\(fs\.readFileSync\(path\.join\(__dirname,'([^']+)'\),'utf8'\)\.match\(\/\\\/\\\*<!--\[\\s\\S\]\*\?-->\\\*\\\/\(\[\\s\\S\]\*\)\/\)\[1\]\);?/g,'');
    code=code.replace(/if\(typeof module!=='undefined'\)module\.exports=/g,'return ');
    code=code.replace(/module\.exports=/g,'return ');

    return code;
  }

  execute(code,name){
    try{
      const fn=new Function('console',code);
      const result=fn(console);
      return result;
    }catch(e){
      console.error(`❌ Execution error in ${name}:`,e);
      throw e;
    }
  }

  async loadAll(names){
    const results={};
    for(const name of names){
      results[name.replace('.md','')]=await this.load(name);
    }
    return results;
  }
}

if(typeof window!=='undefined'){
  window.MarkdownLoader=MarkdownLoader;
}

if(typeof module!=='undefined'){
  module.exports=MarkdownLoader;
}
