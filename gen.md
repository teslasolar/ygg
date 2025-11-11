#!/usr/bin/env node
/*<!--
# Code Generator
Generate Yggdrasil modules from templates (<250 tokens)

## Commands
- `node gen.md module NAME` - New module
- `node gen.md agent NAME` - New agent class
- `node gen.md test NAME` - New test file
- `node gen.md api NAME` - New API endpoint

## Templates
- module: Basic executable .md
- agent: AgentTree subclass
- test: Test suite
- api: REST endpoint
-->*/

const fs=require('fs'),path=require('path');

const templates={
  module:`#!/usr/bin/env node
/*<!--
# {{NAME}}
{{DESCRIPTION}}
-->*/

class {{CLASS}} {
  constructor() {
    // Implementation
  }
}

module.exports = {{CLASS}};
`,
  agent:`#!/usr/bin/env node
/*<!--
# {{NAME}} Agent
Custom agent extending AgentTree
-->*/

const fs=require('fs'),path=require('path');
function loadMD(n){const c=fs.readFileSync(path.join(__dirname,n),'utf8').match(/\\/\\*<!--[\\s\\S]*?-->\\*\\/([\\s\\S]*)/)[1];const m={exports:{}};new Function('module','exports','require','__dirname','__filename',c)(m,m.exports,require,__dirname,__filename);return m.exports;}
const AgentTree=loadMD('ag.md');

class {{CLASS}} extends AgentTree {
  constructor() {
    super();
    // Custom initialization
  }

  customAction() {
    // Custom behavior
  }
}

module.exports = {{CLASS}};
`,
  test:`#!/usr/bin/env node
/*<!--
# {{NAME}} Tests
Test suite for {{NAME}}
-->*/

const assert=require('assert');

describe('{{NAME}}',()=>{
  it('should pass',()=>{
    assert.ok(true);
  });
});
`
};

const[cmd,name]=process.argv.slice(2);

if(!name){
  console.log('Usage: node gen.md [module|agent|test|api] NAME');
  process.exit(1);
}

const className=name.charAt(0).toUpperCase()+name.slice(1);
const filename=name.toLowerCase()+'.md';

if(templates[cmd]){
  const code=templates[cmd]
    .replace(/{{NAME}}/g,className)
    .replace(/{{CLASS}}/g,className)
    .replace(/{{DESCRIPTION}}/g,`${className} module`);

  fs.writeFileSync(filename,code);
  fs.chmodSync(filename,0o755);
  console.log(`✅ Generated ${filename}`);
}else{
  console.log(`❌ Unknown template: ${cmd}`);
  console.log('Available: module, agent, test');
}
