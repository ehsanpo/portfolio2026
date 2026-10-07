#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANCH = 'deploy-gh';
const BUILD_DIR = 'dist';
const TEMP_DIR = path.join(os.tmpdir(), `gh-deploy-${Date.now()}`);

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

  // Step 2: Check build directory & copy to outside TEMP directory
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`❌ Build directory '${BUILD_DIR}' not found!`);
    process.exit(1);
  }

  try {
    console.log(`\n💾 Backing up '${BUILD_DIR}' to temporary directory...`);
    fs.cpSync(BUILD_DIR, TEMP_DIR, { recursive: true });
    console.log(`✅ Build backed up to: ${TEMP_DIR}`);
  } catch (error) {
    console.error('❌ Failed to back up build directory:', error.message);
    process.exit(1);
  }

  // Step 3: Stash uncommitted changes in current working directory
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

  // Step 4: Get current branch
  let currentBranch = 'master';
  try {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { 
      encoding: 'utf-8' 
    }).trim();
  } catch (error) {
    console.warn('⚠️  Could not determine current branch, assuming master');
  }

  // Step 5: Switch to deploy branch and WIPE everything clean
  try {
    const branches = execSync('git branch -a', { encoding: 'utf-8' });
    if (!branches.includes(BRANCH)) {
      console.log(`\n🌿 Creating '${BRANCH}' branch...`);
      run(`git checkout --orphan ${BRANCH}`, `Creating branch '${BRANCH}'`);
    } else {
      run(`git checkout ${BRANCH}`, `Switching to '${BRANCH}' branch`);
    }
    
    // Completely purge tracked and untracked files
    run('git rm -rf .', 'Clearing tracked branch files');
    run('git clean -fdx', 'Cleaning untracked files');
  } catch (error) {
    console.error(`❌ Failed to reset '${BRANCH}' branch`);
    cleanupTemp();
    process.exit(1);
  }

  // Step 6: Copy build contents back from TEMP directory into root
  try {
    console.log(`\n📂 Restoring build files from temp directory...`);
    fs.cpSync(TEMP_DIR, '.', { recursive: true });
    console.log('✅ Build files restored to repository root');
  } catch (error) {
    console.error('❌ Failed to restore build files from temp:', error.message);
    cleanupTemp();
    process.exit(1);
  }

  // Step 7: Stage and commit
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
      cleanupTemp();
      process.exit(1);
    }
  }

  // Step 8: Push force to deploy branch
  try {
    console.log(`\n🚀 Pushing to origin/${BRANCH}...`);
    execSync(`git push -u origin ${BRANCH} --force`, { 
      stdio: 'inherit', 
      shell: true 
    });
    console.log(`✅ Pushed to origin/${BRANCH}`);
  } catch (error) {
    console.error('❌ Failed to push to remote');
    cleanupTemp();
    process.exit(1);
  }

  // Step 9: Return to original branch & cleanup
  try {
    console.log(`\n⏮️  Returning to ${currentBranch} branch...`);
    execSync(`git checkout ${currentBranch}`, { 
      stdio: 'inherit', 
      shell: true 
    });
    
    const stashList = execSync('git stash list', { encoding: 'utf-8' });
    if (stashList.length > 0) {
      console.log('Restoring stashed changes...');
      execSync('git stash pop', { stdio: 'inherit', shell: true });
    }
    
    console.log(`✅ Back on ${currentBranch} branch`);
  } catch (error) {
    console.warn(`⚠️  Could not return to ${currentBranch} branch`);
  } finally {
    cleanupTemp();
  }

  console.log('\n✨ Deployment complete!\n');
}

function cleanupTemp() {
  if (fs.existsSync(TEMP_DIR)) {
    try {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    } catch (_) {}
  }
}

main();