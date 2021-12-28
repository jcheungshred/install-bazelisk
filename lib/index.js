"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const io = __importStar(require("@actions/io"));
const exec = __importStar(require("@actions/exec"));
const tc = __importStar(require("@actions/tool-cache"));
const version = "1.7.4";
const os = "linux";
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        core.debug('Begin Bazelisk Action');
        const version = core.getInput('version', { required: true });
        const os = core.getInput('os', { required: true });
        //await exec.exec('npm install -g bazelisk');
        const bazeliskPath = yield tc.downloadTool(`https://github.com/bazelbuild/bazelisk/releases/download/v${version}/bazelisk-${os}-amd64`);
        const bazelBinPath = "bin";
        core.debug('Successfully downloaded binary to bazeliskPath');
        yield io.mkdirP(bazelBinPath);
        yield io.mv(bazeliskPath, `${bazelBinPath}/bazel`);
        yield exec.exec('chmod', ['+x', `${bazelBinPath}/bazel`]);
        yield core.addPath(`${bazelBinPath}`);
    }
    catch (error) {
        core.setFailed(error.message);
    }
});
run();
