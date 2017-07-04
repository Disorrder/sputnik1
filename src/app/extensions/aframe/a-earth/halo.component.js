import GlowMaterial from 'app/shaders/glow';
var textureLoader = new THREE.TextureLoader();

var cameraPosition;

AFRAME.registerComponent('halo', {
    schema: {
        opacity: { type: 'number', default: 1 },
    },

    init() {
        this.planet = this.el.getObject3D('mesh');
        this.mesh = this.el.getOrCreateObject3D('halo', THREE.Mesh);

        this.mesh.geometry = this.planet.geometry.clone();
        this.mesh.scale.multiplyScalar(1.07);
        this.mesh.position.y = 10;

        this.mesh.material = new GlowMaterial();
        this.uniforms = this.mesh.material.uniforms

        // animation
        this.opacityTween = new TWEEN.Tween(this.uniforms.alpha);
    },

    update(oldData) {
        // var diff = AFRAME.utils.diff(oldData, this.data);
        this.opacityTween.stop()
            .to({ value: this.data.opacity }, 1000)
            .start()
        ;
    },

    remove() {
        this.el.removeObject3D('halo');
    },

    tick(time, dt) {
        cameraPosition = this.el.sceneEl.camera.position.clone();
        cameraPosition.applyMatrix4(this.el.sceneEl.camera.matrixWorld);
        this.uniforms.viewVector.value = cameraPosition;
    }
});
