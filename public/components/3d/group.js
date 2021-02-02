
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Group extends THREE.Group {
	onchild(obj) {
		if(obj.matrix) {
			this.add(obj)
		}
	}
}