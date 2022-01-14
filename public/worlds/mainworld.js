
// each item can be declared as an export but because the module importer revises order it is arguably nicer to just have one export; this makes a sub object off the root
// also multiple files could be imported into same parent without them getting mixed up then

export let name = "root"

export let myworld = {

	blox:"/blox/3d/render",

	mywalkgrab:{
		blox:"/blox/3d/walkgrab",
	},
/*
	myavatar:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/woman1.glb",
		mywalkgrab:{
			blox:"/blox/3d/walkgrab",
		},
		mycollider:{
			blox:"/blox/3d/collider",
			oncollide:function(blox) { console.log("collided1") }
		}
	},
*/
	myground:{
		blox:"/blox/3d/mesh",
		color:0xc0c0e0,
		shape:"sphere",
		xyz:{x:0,y:0,z:0},
		size:{x:10,y:0.1,z:10},
		mycollider:{
			blox:"/blox/3d/collider",
			oncollide:function(blox) { console.log("collided2") }
		}
	},

	blockz:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/magic_crystal.glb",
		xyz:{x:0,y:1,z:0}
	},

	blocka:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/world_space_map_crystal.glb",
		xyz:{x:-5,y:1,z:5},
	},

	blockb:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/world_space_map_crystal.glb",
		xyz:{x:5,y:1,z:5},
	},

	blockc:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/world_space_map_crystal.glb",
		xyz:{x:10,y:1,z:0},
	},

	blockd:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/world_space_map_crystal.glb",
		xyz:{x:-10,y:1,z:0},
	},

	blocke:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/world_space_map_crystal.glb",
		xyz:{x:-5,y:1,z:-5},
	},

	blockf:{
		blox:"/blox/3d/mesh",
		shape:"./meshes/world_space_map_crystal.glb",
		xyz:{x:5,y:1,z:-5},
	},



}

export let zchat = {
	blox:"/blox/chat/chatroom"
}