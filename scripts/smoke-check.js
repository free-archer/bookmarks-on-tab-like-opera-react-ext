const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const requiredArtifacts = [
  'bundle.js',
  'background.js',
  'index.html',
  'manifest.json'
];

for (const artifact of requiredArtifacts) {
  const artifactPath = path.join(distPath, artifact);
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Smoke check failed: missing artifact "${artifact}".`);
  }
}

const manifestPath = path.join(distPath, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (manifest.manifest_version !== 3) {
  throw new Error('Smoke check failed: manifest_version must be 3.');
}

if (
  !manifest.background ||
  manifest.background.service_worker !== 'background.js'
) {
  throw new Error('Smoke check failed: background.service_worker must be "background.js".');
}

console.log('Smoke check passed.');
