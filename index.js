const arr = [
  { parent: null, title: '01-basic', link: null },
  { parent: null, title: '02-Mesh', link: null },
  { parent: null, title: '03-light', link: null },
  {
    title: '目标：创建物体步骤',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：添加轨道控制器OrbitControls查看物体',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：添加辅助器',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：物体移动 && 物体缩放 && 物体旋转',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：物体匀速移动 - requestAnimationFrame时间参数',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：物体匀速移动 - Clock类处理时间',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：gsap设置动画效果',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：轨道控制器阻尼效果 && 画面随网页大小自适应',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：应用dat.gui',
    link: 'https://mcc1999.github.io/undefined',
    parent: '01-basic'
  },
  {
    title: '目标：使用BufferGeometry创建基础几何体',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：1000个三角形，渲染炫酷造型',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：几何体材质',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：几何体材质/纹理：TextureLoader加载图片/文件',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：几何体材质/纹理基本属性：offset、rotation、repeat',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：几何体材质/纹理显示算法：minFilter/magFilter',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：透明材质/纹理',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：材质/纹理环境遮挡贴图',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：PBR物理渲染-材质、灯光',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：PBR物理渲染-材质、灯光',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：PBR物理渲染-材质、灯光',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：PBR物理渲染-材质、灯光',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：纹理加载进度',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：环境贴图',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：场景背景',
    link: 'https://mcc1999.github.io/undefined',
    parent: '02-Mesh'
  },
  {
    title: '目标：灯光与阴影',
    link: 'https://mcc1999.github.io/undefined',
    parent: '03-light'
  },
  {
    title: '目标：平行光阴影属性',
    link: 'https://mcc1999.github.io/undefined',
    parent: '03-light'
  },
  {
    title: '目标：光源-聚光灯',
    link: 'https://mcc1999.github.io/undefined',
    parent: '03-light'
  },
  {
    title: '目标：光源-电光源',
    link: 'https://mcc1999.github.io/undefined',
    parent: '03-light'
  }
]
function convertToTree(data, parent) {
  const tree = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === parent) {
      const { title, link } = data[i]
      const node = { title, link };
            const child = convertToTree(data, data[i].title);
      if (child.length > 0) {
        node.child = child;
      }
      tree.push(node);
    }
  }
  return tree;
}
const readMeTree = convertToTree(arr, null)
console.log(readMeTree);
function generateReadMeExamplesTreeString(tree, treeLevel = 1) {
  if(!tree) return ''
  let str = ''
  for (let i = 0; i < tree.length; i++) {
    if(!tree[i].link){
      str = str + '  '.repeat(treeLevel) + `- ${tree[i].title}\n`
    }else {
      str = str + '  '.repeat(treeLevel) + `- [${tree[i].title}](${tree[i].link})\n`
    }
    if(tree[i].child) {
      str = str + generateReadMeExamplesTreeString(tree[i].child, treeLevel+1)
    }
  }
  return str
}
const s = generateReadMeExamplesTreeString(readMeTree)