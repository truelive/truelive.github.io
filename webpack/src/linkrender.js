import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { knot } from './knot_scene';
    // getting the target element


class RenderBoxScene {
    constructor(wnd) {
        this.wnd = wnd
        this.camera = new THREE.PerspectiveCamera( 70, wnd.innerWidth / wnd.innerHeight, 0.01, 10 );
        this.camera.position.z = 1;
        
        this.scene = new THREE.Scene();
        
        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        const material = new THREE.MeshNormalMaterial();
        
        const mesh = new THREE.Mesh( geometry, material );
        this.scene.add( mesh );
        mesh.name = 'meshBox';
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( wnd.innerWidth, wnd.innerHeight );
        this.renderer.setAnimationLoop( animation );
        
        this.renderer.setAnimationLoop( animation );
        this.wnd.addEventListener( 'resize', this.onWindowResize );
    }
    draw(item) {
        item.appendChild( this.renderer.domElement );
    }
}
var vanta = new RenderBoxScene(window)
function animation( time ) {
    const Knot = vanta.scene.getObjectByName( 'meshBox' );
    Knot.rotation.x = time / 2000;
    Knot.rotation.y = time / 1000;

    vanta.renderer.render( vanta.scene, vanta.camera );
}

function onWindowResize() {
    vanta.renderer.setSize( window.innerWidth, window.innerHeight );
    vanta.camera.aspect = ( window.innerWidth / window.innerHeight );
    vanta.camera.updateProjectionMatrix();
}

const three_scenes  = [vanta, knot]

export { three_scenes, vanta };