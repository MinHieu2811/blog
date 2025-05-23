import { loadGLTFModel } from '@/lib/three'
import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { loadGLTFModel } from '../lib/model'
// import { DogSpinner, DogContainer } from './voxel-dog-loader'
// import a from '../public/dog.glb'

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

type VoxelDogProps = {
  className?: string
}

const VoxelDog = ({ className = '' }: VoxelDogProps) => {
  const refContainer = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef<THREE.WebGLRenderer | null>(null)
  // const urlDogGLB = (process.env.NODE_ENV === 'production' ? 'https://craftzdog.global.ssl.fastly.net/homepage' : '') + '/dog.glb'
  const urlDogGLB = '/dog.glb'
  console.count('render VoxelDog')

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container?.clientWidth ?? 0
      const scH = container?.clientHeight ?? 0

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window?.devicePixelRatio)
      renderer.setSize(scW, scH)
      // renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer
      const scene = new THREE.Scene()

      const target = new THREE.Vector3(-0.5, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(20 * Math.sin(0.2 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI))

      // 640 -> 240
      // 8   -> 6
      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale, 0.01, 50000)
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
      scene.add(ambientLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      controls.enableZoom = false

      loadGLTFModel(scene, urlDogGLB, {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        animate()
        setLoading(false)
      })

      let req: number | null = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req ?? 0)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <div className={`mx-auto lg:w-[540px] lg:h-[540px] md:w-[400px] md:h-[400px] w-[240px] h-[240px] relative voxel-dog ${className}`} ref={refContainer}>
      {loading && <>Loading</>}
    </div>
  )
}

// m="auto"
//     mt={['-20px', '-60px', '-120px']}
//     mb={['-40px', '-140px', '-200px']}
//     w={[280, 480, 640]}
//     h={[280, 480, 640]}

export default VoxelDog
