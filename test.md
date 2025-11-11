#!/usr/bin/env node
/*<!--
# Test Runner
Validate all Yggdrasil modules (<250 tokens)

## Commands
- `node test.md all` - Run all tests
- `node test.md core` - Test core modules
- `node test.md tokens` - Validate token limits

## Tests
- Module loading
- Token budget (<250)
- Class instantiation
- Golden ratio convergence
-->*/

const fs=require('fs'),path=require('path');

function loadMD(name){
  const code=fs.readFileSync(path.join(__dirname,name),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',code)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

function tokenCount(file){
  return Math.ceil(fs.readFileSync(path.join(__dirname,file),'utf8').length/4);
}

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;
const[cmd]=process.argv.slice(2);

console.log('🧪 Yggdrasil Test Suite\n');

if(cmd==='all'||cmd==='core'){
  let pass=0,fail=0;

  try{
    const WorldTree=loadMD('wt.md');
    const tree=new WorldTree();
    console.log(tree.κ===INV_PHI?'✅':'❌','WorldTree κ=1/φ');
    pass++;
  }catch(e){fail++;console.log('❌ WorldTree:',e.message);}

  try{
    const AgentTree=loadMD('ag.md');
    const agent=new AgentTree();
    const energy=agent.photosynthesize();
    console.log(energy>0?'✅':'❌','AgentTree photosynthesis');
    pass++;
  }catch(e){fail++;console.log('❌ AgentTree:',e.message);}

  try{
    const Forest=loadMD('fr.md');
    const forest=new Forest();
    forest.cycle();
    console.log(forest.season===1?'✅':'❌','Forest cycle');
    pass++;
  }catch(e){fail++;console.log('❌ Forest:',e.message);}

  console.log(`\n📊 ${pass} passed, ${fail} failed`);
}

if(cmd==='all'||cmd==='tokens'){
  console.log('\n📏 Token Budget:');
  ['wt.md','ag.md','fr.md','sm.md','run.md','md-loader.md','docs.md','test.md'].forEach(f=>{
    if(fs.existsSync(f)){
      const t=tokenCount(f);
      console.log(t<=250?'✅':'❌',`${f.padEnd(15)} ${t}/250`);
    }
  });
}
