settings = {
	autosave: false,

	// Animations
	orbit: true,
	orbit_speed: 3,

	// Helpers
	axes: true,

	// Interactions
	pan: false,
	zoom: {
		enabled: true,
		min: 15,
		max: 30
	},

	// Slicing and dicing
	slice: {
		visible: false,
		axis: "y",
		position: 0,
		size: 0.25,
		dimensions: {
			x: 7,
			y: 12,
			z: 7
		}
	},

	// Materials
	brain: {
		model_path: "Brain_07/Brain_007.gltf",
		cloud_path: "LR_HighRes_v4",
		model_size: 3542464,
		roughness: 0.15,
		metalness: 0.25,
		wireframe: false,
		color: {
			default: "salmon",
			hover: "firebrick",
			active: "darkred",
			focus: "#fdfa00"
		},
		offset: {
			x: -1.8,
			y: -0.5,
			z: 0
		},
		hemispheres: {
			left: {
				visible: true
			},
			right: {
				visible: true
			}
		}
	},
	head: {
		model_path: "Head_02/Head_02.gltf",
		model_size: 567684,
		visible: false,
		roughness: 1,
		metalness: 0,
		wireframe: true,
		color: {
			default: "#1a1a1a"
		},
		offset: {
			x: -1.8,
			y: -0.2,
			z: 0
		}
	}
};
