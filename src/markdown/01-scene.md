# Scene

## 常用属性
- background：场景的背景，且背景总是首先被渲染的。**值可以是color、texture、cubeMap(CubeTexture)**
  - CubeTexture: 使用CubeTextureLoader加载 \[px、nx、py、ny、pz、nz\] 六个面的图片
- environment：环境纹理贴图，物体材质没单独设置纹理`material.envMap`,所有物体的材质环境贴图都会被设为该值。**值为Texture**。
