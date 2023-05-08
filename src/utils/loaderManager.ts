import * as THREE from 'three'

// 创建loader管理器
const loaderManager = new THREE.LoadingManager();
loaderManager.onStart = () => {
	console.log( 'Started loading files.' );
}
loaderManager.onProgress = (url, itemsLoaded, itemsTotal) => {
	console.log(`Url：${url}`);
	console.log(`Progress：${itemsLoaded} / ${itemsTotal}.`);
	
}
loaderManager.onLoad = () => {
	console.log('ALL Loaded');
}
loaderManager.onError = (url) => {
	console.log( 'There was an error loading ' + url );
}

export default loaderManager;