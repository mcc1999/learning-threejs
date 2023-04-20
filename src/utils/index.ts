import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { BASE_URL } from '../consts'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

interface ParameterCreateTextGeometry {
  text: string;
  fontUrl?: string;
  textGeometryParameter?: Omit<TextGeometryParameters, 'font'>;
  textMaterialParameter?: THREE.MeshBasicMaterialParameters
}

export function createTextGeometry(parameters: ParameterCreateTextGeometry): Promise<THREE.Mesh> {
  const { fontUrl, text, textGeometryParameter, textMaterialParameter } = parameters

  return new Promise((resolve, reject) => {
    new FontLoader().load(fontUrl || `${BASE_URL}images/textures/fonts/gentilis_regular.typeface.json`, 
      font => {	
        const textGeometry = new TextGeometry(text, {
          ...textGeometryParameter,
          font,
        })
        textGeometry.center()
        const textMaterial = new THREE.MeshStandardMaterial(textMaterialParameter);
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