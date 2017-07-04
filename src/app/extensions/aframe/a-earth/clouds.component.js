var textureLoader = new THREE.TextureLoader();

AFRAME.registerComponent('clouds', {
    schema: {
        src: { type: 'map', default: require('./textures/fair_clouds_4k.png') },
        speed: { type: 'number', default: 0.005 },
    },

    init() {
        this.planet = this.el.getObject3D('mesh');
        this.mesh = this.el.getOrCreateObject3D('clouds', THREE.Mesh);

        this.mesh.geometry = this.planet.geometry.clone();
        this.mesh.scale.multiplyScalar(1.01);

        this.mesh.material = new THREE.MeshBasicMaterial({
            // wireframe: true, color: new THREE.Color('red'),
            map:            textureLoader.load(this.data.src),
            side:           THREE.DoubleSide,
            opacity:        0.85,
            transparent:    true,
            depthWrite:     false,
        });
    },

    update(oldData) {
        var diff = AFRAME.utils.diff(oldData, this.data);

        if (diff.src) {
            this.mesh.material.map = textureLoader.load(this.data.src);
            this.mesh.material.needsUpdate = true;
        }
    },

    remove() {
        this.el.removeObject3D('clouds');
    },

    tick(time, dt) {
        this.mesh.rotation.y += dt / 1000 * this.data.speed;
    }
});
