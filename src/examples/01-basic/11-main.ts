import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats  from 'three/examples/jsm/libs/stats.module.js'

/**
 * 目标：webGL兼容性合性能监视器
 */

console.log('isWebGLAvailable', WebGL.isWebGLAvailable());

// 创建性能监视器
let stats = Stats()
// stats.setMode(0) //设置为 0：检测的是画面每秒传输帧数（fps）,1：检测的是画面渲染的时间

stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom

// align top-left 
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'

document.body.appendChild(stats.domElement)

// 添加性能数据
// 法一
// let update = () => {
//   stats.begin()
//   stats.end()
//   requestAnimationFrame(update)
// } 
// update()

// 法二
function render() {
  // 更新帧数
  stats.update()
  requestAnimationFrame(render)
}
render()
