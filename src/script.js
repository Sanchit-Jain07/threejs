import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import fontfile from './fonts/font2.json'
import fontfile2 from './fonts/font.json'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Cursor
const cursor = {
    x: 0,
    y: 0
}

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = - (event.clientY / sizes.height - 0.5)
// })

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0059ff)

const fontLoader = new THREE.FontLoader();

const font2 = fontLoader.parse(fontfile)
const geometry = new THREE.TextGeometry( 'Happy Birthday!', {
    font: font2,
    size: 2,
    height: 1,
} );

const material = new THREE.MeshBasicMaterial({color: 0xfc0320});
const textGeo = new THREE.Mesh(geometry, material); 
scene.add(textGeo)

textGeo.position.y = 15
textGeo.position.x = -12.5

const font = fontLoader.parse(fontfile2)
const geometry2 = new THREE.TextGeometry( 'Arnav', {
    font: font,
    size: 2,
    height: 1,
} );

const material2 = new THREE.MeshBasicMaterial({color: 0xfc0320});
const textGeo2 = new THREE.Mesh(geometry2, material2); 
scene.add(textGeo2)

textGeo2.position.y = 12
textGeo2.position.x = -3

const loader = new GLTFLoader()
loader.load('Cake_01.gltf', function (gltf) {
    scene.add(gltf.scene)
}, undefined, function (error) {
    console.error(error);
})

const light = new THREE.AmbientLight( 0xffffff); // soft white light
scene.add( light );

// Object
// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 30
camera.position.y = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()