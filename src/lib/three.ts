import { Mesh, Object3D, Object3DEventMap, Scene } from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function loadGLTFModel(scene: Scene, glbPath: string, options = { receiveShadow: true, castShadow: true }) {
  const { receiveShadow, castShadow } = options

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()

    loader.load(
      glbPath,
      (gltf: any) => {
        const obj = gltf.scene

        obj.name = 'dog'
        obj.position.y = 0
        obj.position.x = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)

        obj.traverse((child: Object3D<Object3DEventMap>) => {
          if ((child as Mesh)?.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function (error: any) {
        console.error('An error happened', error)
        reject(error)
      }
    )
  })
}
