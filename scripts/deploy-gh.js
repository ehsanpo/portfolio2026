#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const BRANCH = 'deploy-gh';
const BUILD_DIR = 'dist';
const WORKTREE_DIR = path.join(os.tmpdir(), `gh-worktree-${Date.now()}`);

function run(command, description, options = {}) {
  try {
    console.log(`\n📦 ${description}...`);
    execSync(command, { stdio: 'inherit', shell: true, ...options });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed`);
    throw error;
  }
}

function main() {
  console.log('🚀 Starting GitHub Pages deployment via Git Worktree...\n');

  try {
    // Step 1: Build project on master
    run('npm run build', 'Building site');

    if (!fs.existsSync(BUILD_DIR)) {
      console.error(`❌ Build directory '${BUILD_DIR}' not found!`);
      process.exit(1);
    }

    // Step 2: Ensure deploy branch exists
    const branches = execSync('git branch -a', { encoding: 'utf-8' });
    if (!branches.includes(BRANCH)) {
      run(`git branch ${BRANCH}`, `Creating local '${BRANCH}' branch`);
    }

    // Step 3: Create temporary worktree for deploy branch
    run(`git worktree add --detach "${WORKTREE_DIR}"`, 'Creating temporary worktree');

    // Step 4: Checkout orphan/deploy branch inside worktree and clear old files
    run(`git checkout --orphan ${BRANCH}`, 'Checking out deploy branch in worktree', { cwd: WORKTREE_DIR });
    run('git rm -rf .', 'Clearing old deploy files in worktree', { cwd: WORKTREE_DIR });
    run('git clean -fdx', 'Cleaning untracked worktree files', { cwd: WORKTREE_DIR });

    // Step 5: Copy build contents into worktree root
    console.log('\n📂 Copying build files to worktree...');
    fs.cpSync(BUILD_DIR, WORKTREE_DIR, { recursive: true });
    console.log('✅ Build files copied');

    // Step 6: Stage, commit, and force-push from worktree
    run('git add .', 'Staging build files', { cwd: WORKTREE_DIR });
    
    const timestamp = new Date().toISOString();
    try {
      run(`git commit -m "Deploy: ${timestamp}"`, 'Creating deployment commit', { cwd: WORKTREE_DIR });
    } catch (err) {
      console.log('⚠️ No changes detected to commit.');
    }

    run(`git push -u origin ${BRANCH} --force`, `Pushing to origin/${BRANCH}`, { cwd: WORKTREE_DIR });

    console.log('\n✨ Deployment complete!');

  } catch (error) {
    console.error('\n❌ Deployment failed');
  } finally {
    // Step 7: Cleanup worktree (master stays completely clean and unchanged)
    console.log('\n🧹 Cleaning up worktree...');
    try {
      execSync(`git worktree remove --force "${WORKTREE_DIR}"`, { stdio: 'ignore', shell: true });
    } catch (_) {}
    
    if (fs.existsSync(WORKTREE_DIR)) {
      fs.rmSync(WORKTREE_DIR, { recursive: true, force: true });
    }
    console.log('✅ Master branch left clean and untouched.');
  }
}

main();