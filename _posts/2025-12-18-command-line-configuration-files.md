---
layout: post
title: My configuration files
description: I have slowly accumulated many configuration options in my command line settings files. This post shows how I have configured bashrc, inputrc, and vimrc.
date: 2025-12-18
tags: unix macos bash vim
categories: command_line
featured: false
---

I have been using the command line nearly every day for over a decade now. At first, this way of working feels inefficient, but you soon learn small changes that can be made to the interface to make your life easier. This page contains the most useful settings that I have collected over the years. If you see anything you think will be useful, you can copy the lines into your own configuration files. They are stored in your home directory and are hidden since their names begin with a dot.

The `.bashrc` and `.inputrc` files control the behaviour of `bash` and the way in which the user can enter text at the command line, respectively. The `.vimrc` file is a little different since it controls a specific program: my favourite text editor, `vim`, so you only need to look at those options if you use that software.

<br>

#### `.bashrc`

This file is loaded ("sourced") automatically at the start of a new `bash` session. It can be loaded in a running session with `source ~/.bashrc`. My file makes extensive use of aliases, which allow commands to be given other names. For example, the first alias means that if the user types `sl` then `bash` will behave as if they have typed `ls`.

```bash
# Stop `ls` typo
alias sl='ls'

# Make `ls` print more details, sorted in reverse chronological order with
# human-readable file sizes.
alias lsa='ls -lrthG'
# Map all permuations of `lsa` back to `lsa`
alias sla='lsa'
alias sal='lsa'
alias als='lsa'
alias asl='lsa'
alias las='lsa'
# Another typo prevention
alias as='lsa'

# Move up one/two/etc directory with ../.../etc
alias ..='cd ..'
alias ...='cd ../../'
alias ....='cd ../../../'
alias .....='cd ../../../../'

# Add colour to grep
alias grep='grep --color=auto'

# Shortcut for `git status`
alias st='git status'

# More typos
alias les='less'
alias kess='less'

# Keep much more history
export HISTCONTROL=ignoredups:erasedups
export HISTFILESIZE=500000
export HISTSIZE=100000
```

<br>

#### `.inputrc`

This file contains options that control the actual input at the command line. The first two lines are particularly useful since they allow you to move through previous commands more efficiently by only displaying lines in your history that begin with the text you have already typed. For example, if you start typing `git` and hit the up arrow then you will cycle through previous commands that begin with `git`.

```bash
"\e[A": history-search-backward
"\e[B": history-search-forward

# Clear screen with `control j`.
"\C-j": clear-screen
```

<br>

#### `.vimrc`

This file sets options in `vim`, a powerful text editor that I like to use. You only need to consider these options if you use it too.

```bash
" Turn on syntax highlighting and filetype specific stuff
syntax on
filetype indent plugin on
filetype plugin on

" Move backups to local files (note you need to make these directories first)
set backupdir=~/.vim/vimbackup
set directory=~/.vim/vimswp

" Use spaces for indentation
set expandtab
set shiftwidth=4
set softtabstop=4
set autoindent

" Turn on line numbers
set number

" Display cursor's current line and column position
set ruler

" Highlight search hits in file
set hlsearch

" Use dark background colour schemes
set background=dark

" Centre with '<space>'
nmap <space> zz

" Keep centred when searching
nmap n nzz
nmap N Nzz

" Stop 'Ex' mode being started when 'Q' is typed
nnoremap Q <nop>

" Stop 'q:' loading command history
map q: <nop>

" Type aliases when trying to save and/or exit
command W w
command Wq wq
command WQ wq
command Q q

" Escape current most nested parens etc
inoremap <C-j> <Esc>/[)}"'\]>]<CR>:nohl<CR>a

" Swap character under cursor with the one on its right
nnoremap <silent> gc xph

" Type 'jk' or 'kj' quickly in succession to exit insert mode
ino jk <esc>
ino kj <esc>

" Turn off highlighting with '/\'
map /\ :noh<CR>

" Spellchecking suggestions with ^X in normal mode
nmap <C-x> i<C-x>s

" Move up/down one display line with <C-k>/<C-j> (move within wrapped lines)
nmap <C-k> gk
nmap <C-j> gj

" Move between splits with CTRL
" nmap <silent> <C-k> :wincmd k<CR>
" nmap <silent> <C-j> :wincmd j<CR>
" nmap <silent> <C-h> :wincmd h<CR>
" nmap <silent> <C-l> :wincmd l<CR>

" Enable persistent undo (need to make undo directory first)
set undofile                " Save undos after file closes
set undodir=~/.vim/undo " where to save undo histories
set undolevels=1000         " How many undos
set undoreload=10000        " number of lines to save for undo

" Tell vim to remember certain things when we exit
"  '10  :  marks will be remembered for up to 10 previously edited files
"  "100 :  will save up to 100 lines for each register
"  :20  :  up to 20 lines of command-line history will be remembered
"  %    :  saves and restores the buffer list
"  n... :  where to save the viminfo files
set viminfo='10,\"100,:20,%,n~/.viminfo

" Move to most recent position on reloading file
function! ResCur()
  if line("'\"") <= line("$")
    normal! g`"
    return 1
  endif
endfunction

augroup resCur
  autocmd!
  autocmd BufWinEnter * call ResCur()
augroup END
```

##### Bonus `.inputrc` option

You can use `vim`-like editing when typing in the command line by setting these options in `.inputrc`:

```bash
# Use Vi, not Emacs, style editing
set editing-mode vi
set show-mode-in-prompt on

$if mode=vi
        set keymap vi-insert
        # These are for vi-insert mode:
        # Exit insert mode with `jk` or `kj`
        "jk" vi-movement-mode
        "kj" vi-movement-mode
$endif
```

<br>

#### Any comments?

Feel free to submit an issue [here](https://github.com/george-hall/george-hall.github.io/issues).

<br>
<hr>

<h6><small>
<b>Disclaimer:</b> The content in this post is provided as is, without warranty of any kind. I make no guarantees about the completeness, reliability, or accuracy of the code, tips, or advice presented. Any action you take based on this content is strictly at your own risk. I will not be liable for any losses, damages, or issues arising from the use or misuse of this information, including (but not limited to) loss of data, system failures, or security vulnerabilities. Always test code and approaches in a safe environment before deploying them in production.
</small></h6>
