const core = require("@actions/core");
const fs = require("fs");

const groupId = core.getInput("groupId")
const artifactId = core.getInput("artifactId")
const version = core.getInput("version")
const commitSHA = core.getInput("commitSHA")
const outputFile = core.getInput("outputFile") || "manifest.json"
const buildId = core.getInput("buildId") || Date.now().toString()
const deploymentId = Date.now().toString()
const jiraKeys = core.getInput("jiraKeys") || ""
const url = core.getInput("url") || ""

let manifest = {
    artifact: {
        groupId: groupId,
        artifactId: artifactId,
        version: version
    },
    commitSHA: commitSHA,
    buildId: buildId,
    deploymentId: deploymentId,
    jiraKeys: jiraKeys,
    url: url
}

let data = JSON.stringify(manifest)

fs.writeFile(outputFile, data, function(err, result) {
    if (err) {
        core.setFailed(err.message);
        return;
    }
    core.setOutput("manifestFile", outputFile);
});