const fs = require('fs');
const path = require('path');

const examplesPath = path.join(__dirname, 'src/examples')

const inputFilenames = []

function generateHtmlFile(filePath) {
  const folderName = path.basename(path.dirname(filePath))
  const fileName = path.basename(filePath, path.extname(filePath))
  const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learning ThreeJs</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/${filePath}"></script>
  </body>
</html>
`
  const htmlFileName = `${folderName}_${fileName}.html`
  const htmlFilePath = path.join(__dirname, 'src/pages', htmlFileName)
  inputFilenames.push(`${folderName}_${fileName}`)

  fs.writeFileSync(htmlFilePath, content)
}

function traverseDirectory(dirPath) {
  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      traverseDirectory(filePath)
    } else if (path.extname(filePath) === '.ts') {
      generateHtmlFile(path.relative(__dirname, filePath))
    }
  }
}

traverseDirectory(examplesPath)

const viteConfigPath = path.join(__dirname, '', 'vite.config.ts')
const inputs = inputFilenames.reduce((pre, cur, curIndex) => {
  if(curIndex === 1) return `'${pre}': '/src/pages/${pre}.html',\n ` + `          '${cur}': '/src/pages/${cur}.html',\n `
  return pre + `          '${cur}': '/src/pages/${cur}.html',\n `
})
const viteConfigContent = `
  export default {
    base: '/learning-threejs',
    build: {
      outDir: 'docs',
      rollupOptions: {
        input: {
          ${inputs}
        },
      },
    }
  }
`
fs.writeFileSync(viteConfigPath, viteConfigContent)
