const child = require('child_process')
const fs = require('fs')

const output = child.execSync(`git log --format=%B`).toString('utf-8')

const commitMessages = output.split('\n').filter((message) => message !== '')

const newFeatures = []
const bugFixes = []
const behindTheScenes = []
const SEO = []

commitMessages.forEach((commitMessage) => {
  if (commitMessage.startsWith('feature: ')) {
    newFeatures.push(commitMessage)
  }
  if (commitMessage.startsWith('bug: ')) {
    bugFixes.push(commitMessage)
  }
  if (commitMessage.startsWith('behind: ')) {
    behindTheScenes.push(commitMessage)
  }
  if (commitMessage.startsWith('seo: ')) {
    SEO.push(commitMessage)
  }
})

const currentChangelog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
const currentVersion = Number(require('./package.json').version)
const newVersion = currentVersion + 1
let newChangelog = `#(${new Date().toISOString().split('T')[0]}) - v${newVersion} \n\n`

if (newFeatures.length > 0) {
  newChangelog = newChangelog + 'New features \n'
  newFeatures.forEach((newFeature) => (newChangelog = newChangelog + newFeature))
  newChangelog = newChangelog + '\n'
}
if (bugFixes.length > 0) {
  newChangelog = newChangelog + 'New features \n'
  bugFixes.forEach((bugFix) => (newChangelog = newChangelog + bugFix))
  newChangelog = newChangelog + '\n'
}
if (behindTheScenes.length > 0) {
  newChangelog = newChangelog + 'New features \n'
  behindTheScenes.forEach((behindTheScene) => (newChangelog = newChangelog + behindTheScene))
  newChangelog = newChangelog + '\n'
}
if (SEO.length > 0) {
  newChangelog = newChangelog + 'New features \n'
  SEO.forEach((seo) => (newChangelog = newChangelog + seo))
  newChangelog = newChangelog + '\n'
}

fs.writeFileSync('./CHANGELOG.md', `${newChangelog}${currentChangelog}`)
