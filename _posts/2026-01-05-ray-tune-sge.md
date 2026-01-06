---
layout: post
title: Running Ray Tune on Sun Grid Engine
date: 2026-01-05
tags: unix ray-tune machine-learning hyperparameter-optimization
categories:
featured: false
---

[Ray](https://www.ray.io/) is a framework to distribute machine learning processes in parallel and thus accelerate them. [Ray Tune](https://docs.ray.io/en/latest/tune/index.html) is a component of Ray that allows automated hyperparameter optimization. Whilst Ray can [run natively](https://docs.ray.io/en/latest/cluster/vms/user-guides/community/index.html) on a number of cluster managers, it does not have native support for the common Sun Grid Engine (SGE) cluster software. In this post, we show a straightforward way to run it on this engine. It does not allow the Ray scheduler the same level of control over which jobs are run and when, but it is better than nothing!

In this post, I assume that the reader has a basic understanding of how to use Ray Tune. Very briefly, it generates new hyperparameter configurations using a method [specified by the user](https://docs.ray.io/en/latest/tune/api/suggestion.html) (e.g. [Optuna](https://github.com/optuna/optuna) or [BOHB](https://arxiv.org/abs/1801.01596)) and uses a function `evaluate` to assess their relative qualities and thus guide the search (plug: how best to do this is the topic of my [doctoral research](https://etheses.whiterose.ac.uk/id/eprint/29537/)).

We can allow Ray Tune to run on SGE by modifying the `evaluate` function to submit each job to the cluster using the standard SGE `qsub` command. The `evaluate` function below takes a hyperparameter configuration `config` and additional arguments required to run the job on the cluster (conda environment, resource requests):

```python
import subprocess
from ray import tune

def evaluate(
    config,
    conda_init_path,
    conda_env_name,
    work_dir,
    qsub_h_rt,
    qsub_mem,
    qsub_smp,
    qsub_gpu,
):
    trial_name = tune.get_context().get_trial_name()
    # Blank if no GPU requested, otherwise a request for qsub_gpu many:
    gpu_str = "" if qsub_gpu == 0 else f"#$ -l gpu={qsub_gpu}"
    script = f"""
#!/bin/bash -l

#$ -l h_rt={qsub_h_rt}

#$ -l mem={qsub_mem}
#$ -pe smp {qsub_smp}
{gpu_str}

# Set the name of the job.
#$ -N {trial_name}

#$ -o job_stdout_{trial_name}.txt
#$ -e job_stderr_{trial_name}.txt

#$ -wd {work_dir}

source {conda_init_path}
conda activate {conda_env_name}

# Run target `algorithm` with hyperparameter configuration `config`
algorithm --arg1 config.arg1 --arg2 config.arg2
"""

    job_script_path = os.path.join(config.output_path, "job_script.sh")

    with open(job_script_path, "w", encoding="utf-8") as f:
        f.write(script)

    # Submit to cluster using `qsub`
    # The `-sync` argument makes the `subprocess.call` process below hang until
    # the submitted job has finished.
    subprocess.call(["qsub", "-sync", "y", job_script_path])

    # Compute config quality once job has finished
    config_quality = get_config_quality()
    return config_quality
```

In this way, the SGE scheduler takes care of the queue and resource requests, allowing the user to run their Ray Tune jobs on an SGE-based cluster

<br>

#### Any comments?

Feel free to submit an issue [here](https://github.com/george-hall/george-hall.github.io/issues).

<br>
<hr>

<h6><small>
<b>Disclaimer:</b> The content in this post is provided as is, without warranty of any kind. I make no guarantees about the completeness, reliability, or accuracy of the code, tips, or advice presented. Any action you take based on this content is strictly at your own risk. I will not be liable for any losses, damages, or issues arising from the use or misuse of this information, including (but not limited to) loss of data, system failures, or security vulnerabilities. Always test code and approaches in a safe environment before deploying them in production.
</small></h6>
