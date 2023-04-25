import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { BASE_URL } from '../consts'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

interface ParameterCreateTextGeometry {
  text: string;
  isChinese?: boolean;
  fontUrl?: string;
  textGeometryParameter?: Omit<TextGeometryParameters, 'font'>;
  textMaterialParameter?: THREE.MeshBasicMaterialParameters
}

export function createTextGeometry(parameters: ParameterCreateTextGeometry): Promise<THREE.Mesh> {
  const { fontUrl, text, isChinese, textGeometryParameter, textMaterialParameter } = parameters

  return new Promise((resolve, reject) => {
    const defaultFontUrl = isChinese ? `${BASE_URL}images/textures/fonts/Alibaba_PuHuiTi_Regular.json` : `${BASE_URL}images/textures/fonts/gentilis_regular.typeface.json`;
    new FontLoader().load(fontUrl || defaultFontUrl, 
      font => {	
        const textGeometry = new TextGeometry(text, {
          ...textGeometryParameter,
          font,
        })
        textGeometry.center()
        const textMaterial = new THREE.MeshBasicMaterial(textMaterialParameter);
        const dragText = new THREE.Mesh(textGeometry, textMaterial)	
        resolve(dragText)	
      },
      () => {
        console.log('Loading TextFont...')
      },
      (err) => reject(err)
    )
  })
}