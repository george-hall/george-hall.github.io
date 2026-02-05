---
layout: post
title: Git basics
description: An introduction to version control with git with an emphasis on getting you comfortable using it without unnecessary details.
date: 2026-01-30
tags: git
categories:
featured: false
output:
  html_document:
    keep_md: yes
---

Git is a tool for _version control_, a way to track changes to your files. If used correctly, you never need worry about modifying your code as all previous versions will still be accessible.

<br>

### Getting started

Let's get started. For a project where you want to track changes to files, you first create a git _repository_. In the top-level directory of the project, run:


```bash
git init
```

```
## Initialized empty Git repository in /private/tmp/git_tutorial/.git/
```

This creates a directory called `.git` (hidden by default as its name start with a dot). We don't need to worry about the contents of this directory in this post. We can set the username and email address used in this repository with:


```bash
git config user.name "Example User"
git config user.email "example@example.com"
```

Let's create a file called `file.txt` and store the text `This is file.txt` inside it.


```bash
echo "This is file.txt." > file.txt
head file.txt
```

```
## This is file.txt.
```

<br>

### Your first commit

If we want to add `file.txt` to our tracking system, we first need to _commit_ it to the repository. When a file is committed, its contents at that point in time are stored in the repository. Committing a file is a two step process. First, we _stage_ the file to be committed. We then perform the commit. The staging process allows us to mark multiple files to be committed at the same time.

If we want to see the status of files in our repository, we can run `git status`:


```bash
git status
```

```
## On branch main
## 
## No commits yet
## 
## Untracked files:
##   (use "git add <file>..." to include in what will be committed)
## 	file.txt
## 
## nothing added to commit but untracked files present (use "git add" to track)
```

This tells us that we haven't yet made any commits and that the directory contains one untracked (i.e. uncommitted) file. Let's now stage this file to be committed and check `git status` again:


```bash
git add file.txt
git status
```

```
## On branch main
## 
## No commits yet
## 
## Changes to be committed:
##   (use "git rm --cached <file>..." to unstage)
## 	new file:   file.txt
```

Now it tells us that `file.txt` is a new file that is staged for the next commit. Let's now do this commit and add a message so that we know what we have changed:



```bash
git commit -m "Initial commit of file.txt."
```

```
## [main (root-commit) 767a2ea] Initial commit of file.txt.
##  1 file changed, 1 insertion(+)
##  create mode 100644 file.txt
```

We have now made our first commit! We can see it in the log:


```bash
git log
```

```
## commit 767a2ea758c4a36e7fa626dd06ffb31804b6b8a0
## Author: Example User <example@example.com>
## Date:   Mon Feb 2 19:10:54 2026 +0000
## 
##     Initial commit of file.txt.
```

<br>

### Making more commits

Let's change the contents of `file.txt` by adding another line of text at the end:


```bash
echo "Another line." >> file.txt
```

We can see all changes since the last commit with `git diff`:


```bash
git diff
```

```
## diff --git a/file.txt b/file.txt
## index e62236e..5dc90f6 100644
## --- a/file.txt
## +++ b/file.txt
## @@ -1 +1,2 @@
##  This is file.txt.
## +Another line.
```

The final line of this output shows the new line that has been added. Running `git status` shows that a tracked (i.e. previously committed) file has been modified but not yet staged for commit:


```bash
git status
```

```
## On branch main
## Changes not staged for commit:
##   (use "git add <file>..." to update what will be committed)
##   (use "git restore <file>..." to discard changes in working directory)
## 	modified:   file.txt
## 
## no changes added to commit (use "git add" and/or "git commit -a")
```

Let's now stage it, make the commit, and check the log:


```bash
git add file.txt
git commit -m "Added a new line."
```

```
## [main c7f1d0a] Added a new line.
##  1 file changed, 1 insertion(+)
```


```bash
git log
```

```
## commit c7f1d0a5fbe2e5ab6973139ff484862a181e7e9b
## Author: Example User <example@example.com>
## Date:   Mon Feb 2 19:10:54 2026 +0000
## 
##     Added a new line.
## 
## commit 767a2ea758c4a36e7fa626dd06ffb31804b6b8a0
## Author: Example User <example@example.com>
## Date:   Mon Feb 2 19:10:54 2026 +0000
## 
##     Initial commit of file.txt.
```

Finally, let's create a new file, `new_file.txt`, with some text in it and also modify `file.txt` again.


```bash
echo "This a new file." > new_file.txt
echo "A third line!" >> file.txt
```

Now, `git status` tells us that we have created a new, untracked file (`new_file.txt`) and also that we have modified our tracked file (`file.txt`):


```bash
git status
```

```
## On branch main
## Changes not staged for commit:
##   (use "git add <file>..." to update what will be committed)
##   (use "git restore <file>..." to discard changes in working directory)
## 	modified:   file.txt
## 
## Untracked files:
##   (use "git add <file>..." to include in what will be committed)
## 	new_file.txt
## 
## no changes added to commit (use "git add" and/or "git commit -a")
```

We can stage both files to be included in the same commit. Let's do that:


```bash
git add file.txt new_file.txt
git commit -m "Some new changes."
```

```
## [main 2fa28d2] Some new changes.
##  2 files changed, 2 insertions(+)
##  create mode 100644 new_file.txt
```


<br>

### You now know git

At a basic level, you now know all you need to about git: you can track files and, when you want to save a snapshot of the directory, you can stage and commit them. In this way, as long as you don't damage or delete the `.git` directory, you are safe to modify your files as you wish as you can always revert back to an earlier version!

Ideally, each commit of your code should relate to a specific change. However, it can be hard to get a feel for how large a change should be to be committed. To start getting in the habit of version control, I recommend simply committing your code at the end of each day. This is far from best practice, but will at least mean that you have regular snapshots of your project, which is better than nothing! Once you are comfortable doing this, you can start trying to align your commits to specific changes.

Git is a very complex tool, designed to handle large software engineering projects with many collaborators. As such, I have omitted nearly all details in an effort to provide an gentle introduction. There are many good resources where you can learn more. GitHub has [nice documentation](docs.github.com) for both git itself and for its hosting service. For a free, in-depth guide to the details of git, I recommend [Pro Git](https://git-scm.com/book/en/v2). This starts from basics and quickly builds in complexity.

<br>

### Remote repositories (GitHub)

You may be interested on hosting your code on an external site, e.g. [GitHub](https://github.com/). Note that these hosting services are independent of git: git is software to track changes whilst hosting sites provide nice, graphical means of interacting with your repository and collaborating with others.

To host a copy of your repository on GitHub, I'll refer you to their [documentation](https://docs.github.com/en/get-started/start-your-journey) to avoid duplicating it here. Briefly, though, you need to create a GitHub account, authenticate yourself on your local computer, and finally tell git where the GitHub copy of the repository is located.

The authentication process can seem complicated at first, but the following pages provide a useful guide. First, you must [generate a new ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) - this is like a password for two computer to communicate. Second, you must [associate this key with your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account). Once you have completed these two steps, you can create a new repository on GitHub and then _push_ your local repository there following the instructions it will display.

<br>

#### Any comments?

Feel free to submit an issue [here](https://github.com/george-hall/george-hall.github.io/issues).

<br>
<hr>

<h6><small>
<b>Disclaimer:</b> The content in this post is provided as is, without warranty of any kind. I make no guarantees about the completeness, reliability, or accuracy of the code, tips, or advice presented. Any action you take based on this content is strictly at your own risk. I will not be liable for any losses, damages, or issues arising from the use or misuse of this information, including (but not limited to) loss of data, system failures, or security vulnerabilities. Always test code and approaches in a safe environment before deploying them in production.
</small></h6>
