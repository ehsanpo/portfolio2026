---
name: powershell-efficient
description: Reduces terminal calls and context usage for Windows PowerShell development. Use when exploring repositories, running checks, inspecting logs, editing files, or debugging through the terminal.
---

# Efficient PowerShell Workflow

1. Establish the working directory and shell only when unclear.
2. Inspect existing task notes and relevant prior results first.
3. Search filenames and symbols before opening files.
4. Batch related read-only checks into one PowerShell invocation.
5. Store intermediate results in variables and print only useful summaries.
6. For large files, retrieve matching lines and a small surrounding excerpt.
7. For Git tasks, prefer `git status --short` and targeted diffs.
8. Inspect package scripts before choosing tests or build commands.
9. Avoid repeating successful commands unless a new check is needed.
10. Make the smallest targeted change, then run relevant verification.
11. Never hide errors, claim unrun tests passed, or skip necessary checks.
12. When work pauses, update CURRENT_TASK.md with progress and exact next steps.

## Compact output examples

Use:
`git diff --stat`
instead of printing a complete patch when only a summary is needed.

Use:
`rg -n -m 3 "pattern" src`
instead of reading every source file. If `rg` is unavailable, use an appropriate PowerShell alternative.

Use:
`Get-Content .\file.log -Tail 40`
instead of dumping an entire log.

For scripts, prefer a concise success/failure summary while preserving error details needed for debugging.
