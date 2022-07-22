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
- get filenames of changed files
  - TBD
- get filenames of files that are changed when comparing to another branch
  - TBD