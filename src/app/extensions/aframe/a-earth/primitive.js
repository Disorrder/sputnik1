// var assets = {
//     // diffuse: require('./textures/earth_nightlights_2k.jpg'),
//     diffuse: require('./textures/8081-earthmap2k.jpg'),
//     bump: require('./textures/earth-bump.jpg'),
//     specular: require('./textures/earthspec1k.jpg'),
// };

AFRAME.registerPrimitive('a-earth', {
    defaultComponents: {
        geometry: {
            primitive: 'sphere',
            radius: 300,
            segmentsWidth: 64,
            segmentsHeight: 32
        },
        material: {
            shader: 'phong',
            // map: assets.diffuse,
            // bumpMap: assets.bump,
            bumpScale: 10,
            // specularMap: assets.specular,
        },
        earth: {},
        clouds: {},
        halo: {},
    },
    mappings: {
        radius: 'geometry.radius',
        // 'clouds-speed': 'clouds.speed'
    }
});
