# Camera

- 公共方法
  - **updateProjectionMatrix( )**：该方法用于更新相机的投影矩阵。投影矩阵用于将3D点转换为可以在屏幕上显示的2D点。投影矩阵基于相机的视角(fov)、纵横比(aspect)以及近和远裁剪面(near和far)。当相机的任何属性发生变化时，都需要更新投影矩阵以便应用正确的变换。updateProjectionMatrix()方法会基于相机当前属性的值重新计算投影矩阵。


- 相机分类
  - 透视相机(PerspectiveCamera)
  - 正交相机(OrthographicCamera)
  - 立体相机(StereoCamera)
  - 立方相机(CubeCamera)
  - 摄像机阵列(ArrayCamera)

- 透视相机
  - fov、aspect、far、near
  - filmGauge、filmOffset