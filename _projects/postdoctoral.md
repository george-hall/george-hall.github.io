---
layout: page
title: postdoctoral
description: November 2020 - present
img: assets/img/12.jpg
importance: 1
---

Since November 2020, I have been working as a Research Fellow in the Genetics
and Genomic Medicine Department at the UCL Great Ormond Street Institute of
Child Health. I am funded by the Great Ormond Street Hospital Biomedical
Research Centre and carry out computational analysis across a number of
projects, focussed on single-cell and spatial transcriptomics, and applications
of machine learning.

Below are a number of my projects, both completed and ongoing.

## Dawnn

During the [skin sheet analysis project](#quantifying-the-effect-of-growth-acceleration-in-skin-sheets),
we found that existing algorithms for detecting _differential abundance_ did
not find as much signal as we needed. [Dawnn](../../software/#dawnn) compares
two single-cell transcriptomic samples by using a pre-trained neural network to
estimate the concentration of each one within the neighbourhood of each cell,
and determines which neighbourhoods are dominated by a single sample.

## Mapping the developing midbrain and comparing to lab-grown models

The way in which the midbrain develops, particularly during the second
trimester of pregnancy (weeks 13-27), is not well understood. We collected
samples from this time period and analysed them using single-cell and spatial
transcriptomics. We also grew three-dimensional models (_organoids_) of the
brain in the lab and assessed how similar they were to the real thing.
Available as a pre-print (where I am co-first author):
[An in vivo and in vitro spatiotemporal atlas of human midbrain development](https://www.biorxiv.org/content/10.1101/2024.09.25.613908v1).

## Comparison of bioengineered organs and native

Bioengineered organs aim to recapitulate the biological features found in
naturally occurring organs, allowing them to be replaced without requiring
conventional organ donation. As in the organoid project described above, it is
essential to quantify the similarity of the lab-grown organs against the
natural ones that they aim to replicate. I have a number of works in this
direction under preparation, and will update here once they are available as
pre-prints.

## Portable-CELLxGENE

I often collaborate with clinicians and other non-computational researchers,
and one task we often find ourselves performing is checking the expression of
marker genes in the data. Typically, this requires both a computational and
biological expert, but the computational task often is simply typing gene names
into software. To remove the need of a computational expert from these
annotation meeting, I created
[Portable-CELLxGENE](../../software/#Portable-CELLxGENE), which allows
single-cell transcriptomic data to be annotated using a graphical user
interface.

## Quantifying the effect of growth acceleration in skin sheets

I am co-first author on a paper that examines the effects of applying a drug
(ROCKi) to accelerate the growth of skin sheets grown in the lab. This is
essential for treating genetic skin disorders with gene therapy in the clinic.
The work used single-cell transcriptomics to assess whether accelerating growth
has an adverse effect on the quality of the resulting skin sheet. [Short-Term
Treatment with Rho-Associated Kinase Inhibitor Preserves Keratinocyte Stem Cell
Characteristics In Vitro](http://doi.org/10.3390/cells12030346).
