import * as core from '@actions/core';
import * as io from '@actions/io';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';

const install = async () => {
    await exec.exec('npm install -g @bazel/bazelisk')
    
}
