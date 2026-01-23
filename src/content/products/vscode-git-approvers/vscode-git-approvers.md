---
title: "Git Approvers Hover Extension"
date: "2024-11-28"
status: publish
permalink: vscode-git-approvers
author: Ehsan
type: product
id: 335
agency: "Telavox"
category:
  - DevTools
tag:
  - Javascript
  - Typescript

case_link_url: "https://github.com/ehsanpo/pr-approve"
body_text:
  - ""
client: "Telavox"
tagline: "See pull request approvers when hovering over code lines in VS Code"
background_image: "vscode3.png"
logo: "vscodelogo.png"
images:
  - "vscode3.png"

port_date:
  - "2024"
---

See pull request approvers when hovering over code lines in VS Code.
Designed for development teams working with GitHub repositories who need quick access to code review context.

## Core Features

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Instant Approval Context</h3>
    <p class="text-gray-600 dark:text-gray-300">Hover over any line of code to see who approved the corresponding pull request. Eliminates the need to manually trace commits back to GitHub.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Git Integration</h3>
    <p class="text-gray-600 dark:text-gray-300">Leverages git blame to identify commits and automatically fetches related pull request data from GitHub. Works seamlessly with existing repository workflows.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Zero Configuration Setup</h3>
    <p class="text-gray-600 dark:text-gray-300">Works automatically with GitHub repositories once your API token is configured. No additional project setup or configuration files required.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Native VS Code Experience</h3>
    <p class="text-gray-600 dark:text-gray-300">Integrates directly into the editor hover experience. Information appears contextually without disrupting your coding workflow.</p>
  </div>
</div>

## Installation

Install from the downloaded VSIX file:

1. Open Visual Studio Code
2. Navigate to Extensions view (Ctrl+Shift+X)
3. Click the three-dot menu in the Extensions view
4. Select "Install from VSIX..."
5. Browse to and select the downloaded .vsix file

## GitHub API Setup

Configure your GitHub token for pull request access:

1. Generate a personal access token at GitHub with `repo` permissions
2. Set the token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your-token-here
   ```

## Who This Is For

**Development teams** working with GitHub repositories who frequently need to understand code review context without leaving their editor.

**Code reviewers** who want quick access to approval history when examining code changes during reviews.

**Team leads** tracking code quality and review processes across multiple contributors.

## Why This Extension Exists

Code review context often gets lost once pull requests are merged. Developers regularly need to understand who reviewed and approved specific changes, but this information requires manual navigation between the editor and GitHub.

This extension bridges that gap by bringing pull request approval data directly into the code editing experience, maintaining the connection between code and its review history.

## Why Choose This Extension

Focused specifically on approval visibility rather than attempting to replicate GitHub's full interface within VS Code.

Designed for teams that value quick access to review context without disrupting established development workflows.

Built to work with existing Git and GitHub practices, requiring minimal setup or workflow changes.

## Get Started

Download the extension and configure your GitHub token to begin seeing pull request approvers directly in your VS Code editor.
