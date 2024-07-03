import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Objects////////////////
//Test sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry (2, 64, 64),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.7,
//         roughness: 0.1,
//     })
// )
// scene.add(sphere)

//Models/////////////////
const gltfLoader = new GLTFLoader()

//New material to override default GLTF material
const newMaterial = new THREE.MeshPhysicalMaterial ({
    clearcoat: 1,
    clearcoatRoughness: 0
})


gltfLoader.load('static/venus/venus.gltf', (gltf) => {
    //Update material
    gltf.scene.traverse((node) => {
        if(node.isMesh) {
            node.material = newMaterial
        }
    })
    //Add model to scene
    scene.add(gltf.scene.children[0])
})


//Lights////////////////
const ambientLight = new THREE.AmbientLight('#ffffff', 1)
const dirLight = new THREE.DirectionalLight('#ffaa66', 3)
dirLight.position.set(0, 5, 5)
const backLight = new THREE.DirectionalLight('#66aaff', 1)
backLight.position.set(2, 1, -5)


scene.add(ambientLight, dirLight, backLight)


//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //Upadte sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 2, 6)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1.5, 0)
controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animate
const clock = new THREE.Clock()
let oldTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldTime
    oldTime = elapsedTime

    controls.update()

    renderer.render(scene, camera)

    //Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()