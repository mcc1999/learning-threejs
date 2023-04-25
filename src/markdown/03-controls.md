# Controls

- OrbitControls
- TrackballControls
- DragControls
- FirstPersonControls
- PointerLockerControls
- FlyControls
- TransformControls

## OrbitControls
- 常用属性：enabled，autoRotate，enableDamping，enablePan(右键平移)，enableRotate，enableZoom
- autoRotate，enableDamping需要在动画循环调用update()
  
## TrackballControls
类似OrbitControls，但用户可以通过拖动场景的任意部分来旋转、缩放和平移场景，而不是只能在场景中心旋转。这个控制器适用于需要用户可以更加自由地控制场景视角的应用场景。

## DragControls
- 创建控制器时传入，可拖拽对象数组；
- 当创建对象数组只有一个Group对象，并且transformGroup属性为true时，Group对象会同步拖拽

## FirstPersonControls
第一视角控制器，实现原理：通过改变相机的位置和姿态来实现相机的移动和旋转

## PointerLockerControls
第一视角控制器，浏览器提供的 pointer lock API 实现相机旋转

## FlyControls
适用于飞行场景

## TransformControls
可以对任何 Three.js 中的对象进行操作，包括 Mesh、Line、Points 等，不仅仅是创建的几何体。
