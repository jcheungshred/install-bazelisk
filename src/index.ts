import * as core from '@actions/core'
import * as io from '@actions/io';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';

const version = "1.7.4"
const os = "linux"

const run = async () => {
    try {
        core.debug('Begin Bazelisk Action');
        /*const version =
          core.getInput('version', { required : true });
        const bazelBinPath =
          core.getInput('bazel-install-path', { required : true });
        const os =
          core.getInput('os', { required : true });*/
        //await exec.exec('npm install -g bazelisk');
        const bazeliskPath = await tc.downloadTool(`https://github.com/bazelbuild/bazelisk/releases/download/v${version}/bazelisk-${os}-amd64`);
        const bazelBinPath = "/usr/local/bin"
        core.debug('Successfully downloaded binary to bazeliskPath');
        await io.mkdirP(bazelBinPath);
        await io.mv(bazeliskPath, `${bazelBinPath}/bazel`);
        await exec.exec('chmod', ['+x', `${bazelBinPath}/bazel`]);
        await core.addPath(`${bazelBinPath}`);
    } catch(error) {
        core.setFailed(error.message)
    }
}


run()
