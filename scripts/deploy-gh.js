#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANCH = 'deploy-gh';
const BUILD_DIR = 'dist';

function run(command, description) {
  try {
    console.log(`\n📦 ${description}...`);
    execSync(command, { stdio: 'inherit', shell: true });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed`);
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Starting GitHub Pages deployment...\n');

  // Step 1: Build the project
  run('npm run build', 'Building site');

  // Step 2: Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`❌ Build directory '${BUILD_DIR}' not found!`);
    process.exit(1);
  }

  // Step 3: Stash any uncommitted changes
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (status.trim()) {
      console.log('\n📝 Stashing local changes...');
      execSync('git stash', { stdio: 'inherit', shell: true });
    }
  } catch (error) {
    console.error('❌ Failed to check git status');
    process.exit(1);
  }

  // Step 4: Get current branch to return to later
  let currentBranch = 'master';
  try {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { 
      encoding: 'utf-8' 
    }).trim();
  } catch (error) {
    console.warn('⚠️  Could not determine current branch, assuming master');
  }

  // Step 5: Check if branch exists, checkout, and CLEAR old files
  try {
    const branches = execSync('git branch -a', { encoding: 'utf-8' });
    if (!branches.includes(BRANCH)) {
      console.log(`\n🌿 Creating '${BRANCH}' branch...`);
      run(`git checkout --orphan ${BRANCH}`, `Creating branch '${BRANCH}'`);
    } else {
      run(`git checkout ${BRANCH}`, `Switching to '${BRANCH}' branch`);
    }
    
    // Clear tracked files and untracked artifacts from previous deploys
    run('git rm -rf .', 'Clearing tracked branch files');
    run('git clean -fdx', 'Cleaning untracked files');
  } catch (error) {
    console.error(`❌ Failed to reset '${BRANCH}' branch`);
    process.exit(1);
  }

  // Step 6: Copy build contents to root using cross-platform fs.cpSync
  try {
    console.log(`\n📂 Copying build files...`);
    fs.cpSync(BUILD_DIR, '.', { recursive: true });
    
    // Remove the original dist directory so it isn't duplicated in git add .
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
    
    console.log('✅ Build files copied');
  } catch (error) {
    console.error('❌ Failed to copy build files:', error.message);
    process.exit(1);
  }

  // Step 7: Add and commit
  try {
    console.log('\n📝 Staging files...');
    execSync('git add .', { stdio: 'inherit', shell: true });
    
    console.log('💾 Creating commit...');
    const timestamp = new Date().toISOString();
    execSync(`git commit -m "Deploy: ${timestamp}"`, { 
      stdio: 'inherit', 
      shell: true 
    });
    console.log('✅ Commit created');
  } catch (error) {
    if (error.message.includes('nothing to commit')) {
      console.log('⚠️  No changes to commit');
    } else {
      console.error('❌ Failed to commit changes');
      process.exit(1);
    }
  }

  // Step 8: Push to remote
  try {
    console.log(`\n🚀 Pushing to origin/${BRANCH}...`);
    execSync(`git push -u origin ${BRANCH} --force`, { 
      stdio: 'inherit', 
      shell: true 
    });
    console.log(`✅ Pushed to origin/${BRANCH}`);
  } catch (error) {
    console.error('❌ Failed to push to remote');
    process.exit(1);
  }

  // Step 9: Return to original branch
  try {
    console.log(`\n⏮️  Returning to ${currentBranch} branch...`);
    execSync(`git checkout ${currentBranch}`, { 
      stdio: 'inherit', 
      shell: true 
    });
    
    // Unstash changes if they were stashed
    const stashList = execSync('git stash list', { encoding: 'utf-8' });
    if (stashList.length > 0) {
      console.log('Restoring stashed changes...');
      execSync('git stash pop', { stdio: 'inherit', shell: true });
    }
    
    console.log(`✅ Back on ${currentBranch} branch`);
  } catch (error) {
    console.warn(`⚠️  Could not return to ${currentBranch} branch`);
  }

  console.log('\n✨ Deployment complete!\n');
}

main();