---
layout: page
permalink: /repositories/
title: repositories
description:
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

I have a number of GitHub accounts from points in my career:

- [george-hall-ucl](https://github.com/george-hall-ucl): From my current position, mainly single-cell and spatial transcriptomics.
- [george-hall-wtsi](https://github.com/george-hall-wtsi): From my time at the Sanger Institute, software to quantify dataset complexity.
- [george-hall](https://github.com/george-hall): Personal projects.

{% endif %}

{% if site.data.repositories.github_repos %}

My more interesting repositories, all from my postdoctoral research.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
