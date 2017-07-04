var textureLoader = new THREE.TextureLoader();
var assets = {
    // diffuse: require('./textures/earth_nightlights_2k.jpg'),
    diffuse: require('./textures/8081-earthmap2k.jpg'),
    bump: require('./textures/earth-bump.jpg'),
    specular: require('./textures/earthspec1k.jpg'),
};

AFRAME.registerComponent('earth', {
    schema: {
        map: { type: 'map' }
    },
    init() {
        this.planet = this.el.getObject3D('mesh');
        this.material = this.planet.material;

        this.material.map = textureLoader.load(assets.diffuse);
        this.material.bumpMap = textureLoader.load(assets.bump);
        this.material.specularMap = textureLoader.load(assets.specular);
        this.material.needsUpdate = true;
    },

    update(oldData) {
        var diff = AFRAME.utils.diff(oldData, this.data);
        if (diff.map) {
            this.material.map = textureLoader.load(diff.map);
            this.material.needsUpdate = true;
        }
    }
});
