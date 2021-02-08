
// each item can be declared as an export but because the module importer revises order it is arguably nicer to just have one export; this makes a sub object off the root
// also multiple files could be imported into same parent without them getting mixed up then

export let name = "root"

export let myworld = {

	blox:"/blox/3d/render",

	mywalkgrab:{
		blox:"/blox/3d/walkgrab",
	},

	myground:{
		blox:"/blox/3d/mesh",
		color:0x808080,
		shape:"plane",
		xyz:{x:0,y:0,z:0},
		size:{x:1,y:1,z:1},
	},

	block1:{
		blox:"/blox/3d/mesh",
		color:0x800080,
		shape:"box",
		xyz:{x:15,y:0,z:0},
		size:{x:3,y:8,z:3},
	},


	block2:{
		blox:"/blox/3d/mesh",
		color:0x008080,
		shape:"sphere",
		xyz:{x:-12,y:4,z:3},
		size:{x:2,y:2,z:3},
	},


	block3:{
		blox:"/blox/3d/mesh",
		color:0x808000,
		shape:"box",
		xyz:{x:18,y:3,z:4},
		size:{x:1,y:14,z:1},
	},


}
