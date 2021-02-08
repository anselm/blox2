	myscene:{
		blox:"/blox/3d/scene",


		snowman:{
			blox:"/blox/3d/mesh",
			color:0xffffff,
			shape:"sphere",
			xyz:{x:-10,y:2,z:-10},
			size:{x:2,y:2,z:2},
		},
		snowman2:{
			blox:"/blox/3d/mesh",
			color:0xffffff,
			shape:"sphere",
			xyz:{x:-10,y:5,z:-10},
			size:{x:1,y:1,z:1},
		},
		snowman3:{
			blox:"/blox/3d/mesh",
			color:0xffffff,
			shape:"sphere",
			xyz:{x:-10,y:6.5,z:-10},
			size:{x:0.5,y:0.5,z:0.5},
		},

		mytheremin:{
			blox:"/blox/3d/group",
			myglobe:{
				blox:"/blox/3d/mesh",
				color:0xff0000,
				shape:"sphere",
			},
			myhandle:{
				blox:"/blox/3d/mesh",
				color:0xffff00,
				shape:"sphere",
				size:{x:0.1,y:0.1,z:0.1},
			},
			//mynoise:{
			//	blox:"Noise",
			//	file:"audio.mp3"
			//},
			//mywire1:{
			//	kind:"wire",
			//	from:"myglobe.touch",
			//	to:"myhandle.xyz",
			//},
			//mydrag:{
			//	blox:"Drag",
			//}
		},
	}
