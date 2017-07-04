import GlowMaterial from 'app/shaders/glow';
var textureLoader = new THREE.TextureLoader();

var cameraPosition;

AFRAME.registerComponent('halo', {
    schema: {
        opacity: { type: 'number', default: 1 },
        scale: { type: 'number', default: 1.02 },
    },

    init() {
        this.planet = this.el.getObject3D('mesh');
        this.mesh = this.el.getOrCreateObject3D('halo', THREE.Mesh);

        this.mesh.geometry = this.planet.geometry.clone();
        // this.mesh.scale.setScalar(this.data.scale);
        this.mesh.position.y = 10;
        // console.log('haloooo', this.mesh);

        this.mesh.material = new GlowMaterial();
        this.uniforms = this.mesh.material.uniforms

        // animation
        this.opacityTween = new TWEEN.Tween(this.uniforms.alpha);
    },

    update(oldData) {
        var diff = AFRAME.utils.diff(oldData, this.data);
        if (diff.opacity) this.uniforms.alpha.value = diff.opacity;
        if (diff.scale) this.mesh.scale.setScalar(diff.scale);
        // this.opacityTween.stop()
        //     .to({ value: this.data.opacity }, 1000)
        //     .start()
        // ;
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
