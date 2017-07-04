var textures = [];
var textureLoader = new THREE.TextureLoader();

AFRAME.registerShader('phong', {
    schema: { // TODO: add all mappings
        color: { type: 'color' },
        map: { type: 'map' },
        bumpMap: { type: 'map' },
        bumpScale: { default: 1 },
        specular: { type: 'color', default: 'grey' },
        specularMap: { type: 'map' },

        // emissive: { type: 'color' },
        // emissiveMap: { type: 'map' },
        // emissiveIntensity: { type: 'number' },
        shininess: { type: 'number' },
        roughness: { type: 'number' },
        transparent: { default: false },
        opacity: { type: 'number', default: 1 },
    },

    init(data) {
        this.data = data;

        this.material = new THREE.MeshPhongMaterial();
        this.update(data);  // `update()` currently not called after `init`. (#1834)
    },

    update(data) {
        // var diff = AFRAME.utils.diff(this.data, data);
        this.data = data;

        _.each(data, (v, k) => {
            if (v === undefined) return;
            if (v === null) return this.material[k] = v;

            let type = this.schema[k];
            if (!type) return;
            type = type.type;

            if (type === 'color' && v && !(v instanceof THREE.Color)) {
                v = new THREE.Color(v);
            }

            if (type === 'map' && v && !(v instanceof THREE.Texture)) {
                v = textureLoader.load(v);
                this.material.needsUpdate = true;
            }

            this.material[k] = v;
            data[k] = v;
        })
    },
});
