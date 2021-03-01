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
    const message = commitMessage.split('feature:')[1] + '\n'
    newFeatures.push(message)
  }
  if (commitMessage.startsWith('bug: ')) {
    const message = commitMessage.split('bug:')[1] + '\n'
    bugFixes.push(message)
  }
  if (commitMessage.startsWith('behind: ')) {
    const message = commitMessage.split('behind:')[1] + '\n'
    behindTheScenes.push(message)
  }
  if (commitMessage.startsWith('seo: ')) {
    const message = commitMessage.split('seo:')[1] + '\n'
    SEO.push(message)
  }
})

const currentChangelog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
const currentVersion = Number(require('./package.json').version)
const newVersion = currentVersion + 1
let newChangelog = `#(${new Date().toISOString().split('T')[0]}) - v${newVersion} \n\n`

if (newFeatures.length > 0) {
  newChangelog = newChangelog + 'New features: \n'
  newFeatures.forEach((newFeature) => (newChangelog = newChangelog + newFeature))
  newChangelog = newChangelog + '\n\n'
}
if (bugFixes.length > 0) {
  newChangelog = newChangelog + 'Bug fixes: \n'
  bugFixes.forEach((bugFix) => (newChangelog = newChangelog + bugFix))
  newChangelog = newChangelog + '\n\n'
}
if (behindTheScenes.length > 0) {
  newChangelog = newChangelog + 'Behind the scenes: \n'
  behindTheScenes.forEach((behindTheScene) => (newChangelog = newChangelog + behindTheScene))
  newChangelog = newChangelog + '\n\n'
}
if (SEO.length > 0) {
  newChangelog = newChangelog + 'Potential impact on SEO, tracking or revenue: \n'
  SEO.forEach((seo) => (newChangelog = newChangelog + seo))
  newChangelog = newChangelog + '\n\n'
}

fs.writeFileSync('./CHANGELOG.md', `${newChangelog}${currentChangelog}`)
