import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class RenderKnotScene {
    constructor(wnd) {
        this.wnd = wnd
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );
        this.camera.position.z = -15;
        this.camera.position.y = 5;
        this.camera.position.x = 2;
        this.scene = new THREE.Scene();

        RectAreaLightUniformsLib.init();

        const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 4, 10 );
        rectLight1.position.set( -5, 5, 5 );
        this.scene.add( rectLight1 );
        
        const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 5, 4, 10 );
        rectLight2.position.set( 0, 5, 5 );
        this.scene.add( rectLight2 );

        const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 5, 4, 10 );
        rectLight3.position.set( 5, 5, 5 );
        this.scene.add( rectLight3 );

        this.scene.add( new RectAreaLightHelper( rectLight1 ) );
        this.scene.add( new RectAreaLightHelper( rectLight2 ) );
        this.scene.add( new RectAreaLightHelper( rectLight3 ) );

        const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
        const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
        const meshKnot = new THREE.Mesh( geoKnot, matKnot );
        meshKnot.name = 'meshKnot';
        meshKnot.position.set( 0, 5, 0 );
        this.scene.add( meshKnot );
        this.camera.lookAt(meshKnot.position);
        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh( geometry, material );
        this.scene.add( mesh );

        const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000);
        const matStdFloor = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.1, metalness: 0 });
        const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
        this.scene.add( mshStdFloor );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( this.wnd.innerWidth, this.wnd.innerHeight );
        this.renderer.setAnimationLoop( animation );
        
        
        this.wnd.addEventListener( 'resize', this.onWindowResize );
        
        // animation
        
    }
    draw(item) {
        item.appendChild( this.renderer.domElement );
    }
}
var knot = new RenderKnotScene(window)
function animation( time ) {
    const Knot = knot.scene.getObjectByName( 'meshKnot' );
    Knot.rotation.y = time / 1000;
    Knot.rotation.x = time / 2000;
    Knot.rotation.y = time / 1000;
    knot.renderer.render( knot.scene, knot.camera );
}

function onWindowResize() {
    knot.renderer.setSize( window.innerWidth, window.innerHeight );
    knot.camera.aspect = ( window.innerWidth / window.innerHeight );
    knot.camera.updateProjectionMatrix();
}



export { knot };