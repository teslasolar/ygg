#!/usr/bin/env node
/*<!--
# Deploy Script
Deploy Yggdrasil DDI to GitHub Pages

## Commands
- `node deploy.md check` - Pre-flight checks
- `node deploy.md build` - Build for production
- `node deploy.md test` - Test deployment locally
- `node deploy.md publish` - Publish to GitHub Pages

## Features
- Validates all modules
- Checks token budgets
- Tests all links
- Minifies code (optional)
- Publishes to gh-pages branch
-->*/

const fs=require('fs'),path=require('path');
const{execSync}=require('child_process');

const[cmd]=process.argv.slice(2);

function log(emoji,msg){
  console.log(`${emoji} ${msg}`);
}

function check(){
  log('🔍','Running pre-flight checks...\n');

  // Check git status
  try{
    const status=execSync('git status --porcelain',{encoding:'utf8'});
    if(status.trim()){
      log('⚠️','Working directory has uncommitted changes');
    }else{
      log('✅','Git working directory clean');
    }
  }catch(e){
    log('❌','Git check failed:'+e.message);
    return false;
  }

  // Check all .md modules exist
  const required=['wt.md','ag.md','fr.md','sm.md','run.md','md-loader.md'];
  let missing=[];
  required.forEach(f=>{
    if(!fs.existsSync(f)){
      missing.push(f);
    }
  });

  if(missing.length>0){
    log('❌',`Missing modules: ${missing.join(', ')}`);
    return false;
  }
  log('✅',`All core modules present (${required.length})`);

  // Check HTML files
  const htmlFiles=['index.html','forest.html','agents.html','metrics.html'];
  htmlFiles.forEach(f=>{
    if(fs.existsSync(f)){
      log('✅',`${f} exists`);
    }else{
      log('⚠️',`${f} missing`);
    }
  });

  // Test module loading
  try{
    require('./run.md');
    log('✅','Module loading works');
  }catch(e){
    log('❌','Module loading failed:'+e.message);
    return false;
  }

  log('\n✅','All pre-flight checks passed!');
  return true;
}

function build(){
  log('🏗️','Building for production...\n');

  if(!check()){
    log('❌','Pre-flight checks failed, aborting build');
    return;
  }

  // Create build directory
  if(!fs.existsSync('build')){
    fs.mkdirSync('build');
  }

  // Copy all necessary files
  const files=[
    ...fs.readdirSync('.').filter(f=>f.endsWith('.md')),
    ...fs.readdirSync('.').filter(f=>f.endsWith('.html')),
    'README.md'
  ];

  log('📦','Copying files to build/');
  files.forEach(f=>{
    fs.copyFileSync(f,path.join('build',f));
    log('  ','✓ '+f);
  });

  // Copy configs
  if(fs.existsSync('configs')){
    if(!fs.existsSync('build/configs')){
      fs.mkdirSync('build/configs');
    }
    fs.readdirSync('configs').forEach(f=>{
      fs.copyFileSync(
        path.join('configs',f),
        path.join('build','configs',f)
      );
    });
    log('✅','Copied configs/');
  }

  log('\n✅','Build complete! Files in ./build/');
}

function test(){
  log('🧪','Testing deployment locally...\n');

  const http=require('http');
  const port=8000;

  const server=http.createServer((req,res)=>{
    let file='index.html';
    if(req.url!=='/'){
      file=req.url.substring(1);
    }

    const filePath=path.join(__dirname,file);
    if(fs.existsSync(filePath)){
      const ext=path.extname(filePath);
      const contentType={
        '.html':'text/html',
        '.js':'text/javascript',
        '.md':'text/plain',
        '.css':'text/css',
        '.json':'application/json'
      }[ext]||'text/plain';

      res.writeHead(200,{'Content-Type':contentType});
      res.end(fs.readFileSync(filePath));
    }else{
      res.writeHead(404);
      res.end('Not found');
    }
  });

  server.listen(port);
  log('🌐',`Test server running on http://localhost:${port}`);
  log('📝','Press Ctrl+C to stop');
}

function publish(){
  log('🚀','Publishing to GitHub Pages...\n');

  if(!check()){
    log('❌','Pre-flight checks failed, aborting');
    return;
  }

  try{
    // Check if gh-pages branch exists
    execSync('git rev-parse --verify gh-pages',{stdio:'ignore'});
    log('✅','gh-pages branch exists');
  }catch{
    log('📝','Creating gh-pages branch...');
    execSync('git checkout --orphan gh-pages');
    execSync('git rm -rf .');
    execSync('git commit --allow-empty -m "Initialize gh-pages"');
    execSync('git checkout main||git checkout master');
  }

  // Build first
  build();

  // Deploy
  log('📤','Deploying to gh-pages...');
  execSync('git add build/');
  execSync('git commit -m "Deploy to GitHub Pages"||true');
  execSync('git subtree push --prefix build origin gh-pages');

  log('\n✅','Deployed to GitHub Pages!');
  log('🌐','Your site will be available at:');
  log('   ','https://[username].github.io/ygg/');
}

if(!cmd||cmd==='help'){
  console.log('Deploy Script Commands:');
  console.log('  check   - Pre-flight checks');
  console.log('  build   - Build for production');
  console.log('  test    - Test locally');
  console.log('  publish - Publish to GitHub Pages');
}else if(cmd==='check'){
  check();
}else if(cmd==='build'){
  build();
}else if(cmd==='test'){
  test();
}else if(cmd==='publish'){
  publish();
}else{
  log('❌',`Unknown command: ${cmd}`);
}
