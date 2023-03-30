const fs = require('fs');
const path = require('path');

// 根据examples生成html
const examplesPath = path.join(__dirname, 'src/examples')
// 获取example文件名数组
const exampleFilenames = []
// 生成README所需htmlFilename: {title, filepath}的map
const readmeMap = {}
const readmeTreeParentNodes = []

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
  exampleFilenames.push(`${folderName}_${fileName}`)

  fs.writeFileSync(htmlFilePath, content)
}

function generateReadMeTitle(filePath) {
  // console.log("filePath", filePath);
  // 读取ts文件内容
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 定义正则表达式
  const regExp = /目标：(.+)/g;

  // 匹配目标行内容
  const matchResult = fileContent.match(regExp);

  const folderName = path.basename(path.dirname(filePath))
  const fileName = path.basename(filePath, path.extname(filePath))
  const mapKey = `${folderName}_${fileName}`
  readmeMap[mapKey] = { filepath: filePath } 

  // 如果匹配到目标行，输出匹配到的内容
  if (matchResult) {
    readmeMap[mapKey].title = matchResult[0]
  } else {
    readmeMap[mapKey].title = mapKey
  }
}

function traverseDirectory(dirPath, first = false) {
  const files = fs.readdirSync(dirPath)
  if(first){
    files.forEach(filename => {
      readmeTreeParentNodes.push({
        parent: null,
        title: filename,
        link: null
      })
    })
  }
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      traverseDirectory(filePath)
    } else if (path.extname(filePath) === '.ts') {
      generateHtmlFile(path.relative(__dirname, filePath))
      generateReadMeTitle(path.relative(__dirname, filePath))
    }
  }
}

traverseDirectory(examplesPath, true)

// 配置vite.config.ts中 build.rollupOptions.input,每个html文件单独打包
const viteConfigPath = path.join(__dirname, 'vite.config.ts')
const inputs = exampleFilenames.reduce((pre, cur, curIndex) => {
  if(curIndex === 1) return `'${pre}': '/src/pages/${pre}.html',\n ` + `          '${cur}': '/src/pages/${cur}.html',\n `
  return pre + `          '${cur}': '/src/pages/${cur}.html',\n `
})
const viteConfigContent = `
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/learning-threejs',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        ${inputs}
      },
    },
  }
})
`
fs.writeFileSync(viteConfigPath, viteConfigContent)

// 根据examples html生成相应的README链接
const readmePath = path.join(__dirname, 'README.md')
const readmeExamplesTreeFlatArr = Object.keys(readmeMap).map(filename => {
  const { title, filepath } = readmeMap[filename] 
  return {
    title,
    filepath,
    link: `https://mcc1999.github.io/learning-threejs/src/pages/${filename}.html`,
    parent: filename.split('_')[0],
  }
})

function convertToTree(data, parent) {
  const tree = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === parent) {
      const { title, link, filepath } = data[i]
      const node = { title, link, filepath };
      const child = convertToTree(data, data[i].title);
      if (child.length > 0) {
        node.child = child;
      }
      tree.push(node);
    }
  }
  return tree;
}
const readmeExamplesTree = convertToTree([...readmeTreeParentNodes, ...readmeExamplesTreeFlatArr], null)
function generateReadMeExamplesTreeString(tree, treeLevel = 1) {
  if(!tree) return ''
  let str = ''
  for (let i = 0; i < tree.length; i++) {
    if(!tree[i].link){
      str = str + '  '.repeat(treeLevel) + `- ${tree[i].title}\n`
    }else {
      str = str + '  '.repeat(treeLevel) + `- [${tree[i].title}](${tree[i].link})\n[【code】](${tree[i].filepath})\n`
    }
    if(tree[i].child) {
      str = str +  generateReadMeExamplesTreeString(tree[i].child, treeLevel + 1) + `\n`
    }
  }
  return str
}
const readmeExampleLinksString = generateReadMeExamplesTreeString(readmeExamplesTree)
const readmeContent = `# Leaning Three.js by coding some examples which packaged with Vite.
- Examples
${readmeExampleLinksString}
`
fs.writeFileSync(readmePath, readmeContent)
