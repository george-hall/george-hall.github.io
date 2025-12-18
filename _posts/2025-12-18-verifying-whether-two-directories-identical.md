---
layout: post
title: How to check whether two directories are identical
date: 2025-12-18
tags: unix macos bash
categories: command_line
featured: false
---

When copying a directory containing many files, it is important to make sure that everything has copied correctly. This post shows a simple way of doing so (method based on answers given [here](https://stackoverflow.com/questions/1657232/how-can-i-calculate-an-md5-checksum-of-a-directory)).

<br>

### Quick start

Run the following command at the root of each directory whose integrity you want to verify (i.e. the original directory and its copy). If the outputs match, then the directories contain the same contents.

```bash
$ { find . -type f -exec md5sum {} \; && find . ; } | sort -k 1 | md5sum
```

Read on to see the logic behind this approach (and some common pitfalls)!

<br>

### `md5` checksums

A _checksum_ is a numeric summary of a file. There are many ways to compute them. The `md5` algorithm is a fast and simple option that can be run using the `md5sum` program. A good checksum changes substantially following even a small change to a file (e.g. a single letter being altered). For example, if we create two files, `file1.txt` and `file2.txt` that contain just "`text1`" and "`text2`", respectively, then their `md5` checksums are completely different:

```bash
$ echo "text1" > file1.txt
$ echo "text2" > file2.txt
$ md5sum file1.txt file2.txt
a1d17e602afd232c64d1ba0015227c13  file1.txt
6994d44ab6c3b4c005357798f6b0d750  file2.txt
```

### Checksums of a directory

`md5` checksums can only be computed for files. To compute a checksum of an entire directory, we can compute one checksum for each file in the directory, save these to a file, and then compute that file's checksum. This will provide a single number that summarises the contents of an entire directory.

Using this technique, we can verify whether a directory was copied correctly by computing one checksum for the original directory and one for its copy.  If all files were copied correctly, then the checksums of the checksums files will match. However, if the contents of any file differs between these directories -- even by a single character -- then the checksum of the checksum files will differ too.

For example, consider two directories with the following structure, where `file1.txt` contains "`text1`", `file2.txt` contains "`text2`", and a subdirectory `subdir` with `file3.txt`, which contains "`text3`":

```bash
.
├── dir1
│   ├── file1.txt
│   ├── file2.txt
│   └── subdir
│       └── file3.txt
└── dir2
    ├── file1.txt
    ├── file2.txt
    └── subdir
        └── file3.txt
```

We can check whether the contents of `dir1` and `dir2` are identical as follows:

```
# At root of dir1
$ { find . -type f -exec md5sum {} \; && find . ; } | sort -k 1 > ../dir1_md5sums.txt
# At root of dir2
$ { find . -type f -exec md5sum {} \; && find . ; } | sort -k 1 > ../dir2_md5sums.txt

# In directory containing dir1_md5sums.txt and dir2_md5sums.txt
$ md5sum dir1_md5sums.txt dir2_md5sums.txt
75a025445670330698b5f807f6308726  dir1_md5sums.txt
75a025445670330698b5f807f6308726  dir2_md5sums.txt
```

The matching checksums of `dir1_md5sums.txt` and `dir2_md5sums.txt` tells us that the checksums of all files in the two directories match, meaning that the two directories are identical.

Note that the `find` commands must be run _within_ the directories (i.e. `find` for `dir1` is run at the highest level of `dir1`). This is necessary because `find` prepends the directory name to the file paths it outputs. Hence, if run outside of the directory, it would output a path containing "`dir1`" when run on `dir1` and "`dir2`" when run on `dir2`. These different paths would consequently lead to different checksums of `dir1_md5sums.txt` and `dir2_md5sums.txt`.

In some cases, it might be important to ensure that empty directories have been copied into the correct locations. Since these directories would be missed by the initial `find` command (which only looks for files), we also run `find .` to return the overall structure of the directory (this time including empty directories). We chain together the commands within braces to allow us to sort the outputs using a single command. We sort the outputs in case files are listed in a different order when running in different directories, which would lead to different directory checksums even though the contents of each file and the directory structure itself may have been preserved.

Putting this all together, the above command creates a checksum file for `dir1` that looks like:

```bash
$ cat dir1_md5sums.txt
.
./file1.txt
./file2.txt
./subdir
./subdir/file3.txt
4ca8392d7fe0ee3dfe17ec2193ee79d0  ./subdir/file3.txt
6994d44ab6c3b4c005357798f6b0d750  ./file2.txt
a1d17e602afd232c64d1ba0015227c13  ./file1.txt
```

Let's see what happens if we change the text in `file1.txt` in `dir1` to `text4`.

```bash
echo "text4" > dir1/file1.txt
# At root of dir1
$ { find . -type f -exec md5sum {} \; && find . ; } | sort -k 1 > ../dir1_md5sums.txt
# At root of dir2
$ { find . -type f -exec md5sum {} \; && find . ; } | sort -k 1 > ../dir2_md5sums.txt

# In directory containing dir1_md5sums.txt and dir2_md5sums.txt
$ md5sum dir1_md5sums.txt dir2_md5sums.txt
83d3e2336d67208a9598aa414f80be3c  dir1_md5sums.txt
857d78aeec4dff651d371c2ece4782d6  dir2_md5sums.txt
```

Now the two checksums are different! This tells us that there is a difference somewhere in the directories. If `dir1` were the original directory and `dir2` a copy of it, we could conclude that the copy has been unsuccessful as the contents of at least one file differs between the two directories.

<br>

### FAQs

##### How do I know which files differ?

In our simple case above, we can identify the file that differs by comparing the checksums contained in `dir1_md5sums.txt` and `dir2_md5sums.txt` by eye. If we have many files, however, this isn't feasible. In that case, we could compare the two checksums files using `comm`, which will print the lines that differ. `comm -23` prints lines in the first file that aren't in the second.

Recall that, in the above example, the directories differ only in the contents of `file1`. Thus `comm -23` outputs only the checksum for that file:

```bash
$ comm -23 dir1_md5sums.txt dir2_md5sums.txt
9ac5e4b278717acc79bd4cbf3b79c6b6  ./file1.txt
```

<br>

##### Can two different files generate the same checksum?

Yes, but the chances are vanishingly small that this happens at random. An `md5` checksum is 32 digits long and each digit takes one of 16 values (i.e. it is hexadecimal), which means that there are 16^32 = 340,282,366,920,938,463,463,374,607,431,768,211,456 possibilities. Given that `md5` is designed to distribute checksums across all these options, you can see that it is exceedingly unlikely for you to generate two files which differ in content but have the same checksum.

In theory (and in practice!), an attacker could construct two files that have the same `md5` checksum (`md5` has been considered broken for security purposes for decades). But as long as you are not in a scenario where someone might be maliciously non-identical files with identical checksums to mess with your copying, you can safely assume that no two files with different contents will share a checksum.

<br>

##### Why does an identical directory has different checksums on different computers?

I have seen this happen in cases where the `sort` command differs slightly between operating systems (e.g. maybe numbers are considered 'smaller' than letters on MacOS but 'larger' than letters on Linux). This leads to different orders of files in the checksum file. A simple workaround is to copy the two checksum files to the same machine, sort them there and compare the checksums of the re-sorted files. If these match, then the directories are identical.

<br>

##### How can I get in touch about this post?

Feel free to submit an issue [here](https://github.com/george-hall/george-hall.github.io/issues).

<br>
<hr>

<h6><small>
<b>Disclaimer:</b> The content in this post is provided as is, without warranty of any kind. I make no guarantees about the completeness, reliability, or accuracy of the code, tips, or advice presented. Any action you take based on this content is strictly at your own risk. I will not be liable for any losses, damages, or issues arising from the use or misuse of this information, including (but not limited to) loss of data, system failures, or security vulnerabilities. Always test code and approaches in a safe environment before deploying them in production.
</small></h6>
