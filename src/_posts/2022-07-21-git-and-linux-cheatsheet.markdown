---
layout: post
title:  "Git and Linux Cheatsheet"
date:   2022-07-21 19:40:38 +0300
---
This page serves only for personal use only and inteded to be used as a helper to remember some workcases. Please be aware of what you copying, this might not work for you.

- checkout to previous branch
  - `git checkout -`
- `git push -u origin branch-name`
- set up Intellij Idea as a diff tool
  - ```
    [diff]
      tool = intellij
      guitool = intellij
    [difftool "intellij"]
      path = C:/Program Files/JetBrains/IntelliJ IDEA Community Edition 2020.1.1/bin/idea.bat
      cmd = cmd \"/C D:\\workspace\\tools\\symlink\\idea\\bin\\idea.bat diff $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE")\"
    ```
- turn on autocorrect for commands `git config --global help.autocorrect 1`
- prune(clear the db from unreachable ibjects) on each pull `git config --global fetch.prune true`
- get filenames of changed files
  - `git diff HEAD --name-only`
  - `git status -s | cut -d' ' -f 3`
- get filenames of files that are changed when comparing to another branch
  - `git diff release1...HEAD` - three dots show relative diff, uncommited files are not included. Basically reads "What have been modified in HEAD(current branch) in comparassion to release1?"
    - This helps making patches to a certain files\folders when cherry-pick or merge isn't an option
  - `git diff release1...HEAD | xargs -i@ git checkout release1 -- @` reverts files to original state (considering release1 contains original) to working tree. If chained with filtering it is 
- find a revision with certain changes
  - `git rev-list -–all | xargs git grep -F 'pattern'`
- make a commit without any changes `git commit --allow empty -m 'new empty commit`