
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///	- soup manager? TODO TBD - move out of artifacts themselves?
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// - look for things coming in
/// - bind them?

// camrea
// group
// mesh
// 	text?
// 	skybox?
// 	ground?
// light
//
// material
// geometry
// sprite?

// collider
// walking
// orbiting
// emitter


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
///	- not filled out yet - just some thoughts
///	- has to have some way of noticing children showing up
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class group extends THREE.Group {


}



/*

async function startup() {

///////////////////////////////////////////////
// 
///////////////////////////////////////////////


let textures = []
const numItemsToGenerate = 8; //how many gallery items you want on the screen
const imageWidth = 512; //your desired image width in pixels
const imageHeight = 512; //desired image height in pixels
const collectionID = 446755; //the collection ID from the original url
async function renderGalleryItem(){
  let response = await fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/`)
  console.log(response)
  let        texture = new THREE.TextureLoader().load( response.url );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,1);
        texture.magFilter = THREE.NearestFilter;
  console.log(response.url)
  textures.push(texture)
  
  
  return
  let galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  galleryItem.innerHTML = `
    <img class="gallery-image" src="${response.url}" alt="gallery image"/>
  `
  document.body.appendChild(galleryItem);
}
for(let i=0;i<numItemsToGenerate;i++){
  await renderGalleryItem();
}

///////////////////////////////////////////////
// 
///////////////////////////////////////////////


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}


texture = 0
  console.log(textures.length)

  {
    let item = 0
    for(let i = 0; i < Math.PI * 5 ; i+= Math.PI / 20.0 ) {

      let rgb = HSVtoRGB(i/3.14,0.3,1)
      let color = rgb.r * 65536 + rgb.g * 256 + rgb.b

        if(textures.length) {
      texture = textures[item]
        item++; if(item > textures.length) item = 0
        }

      //let color =  Math.random() * 0xc0c0c0 + 0x404040;
      const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.01 );
      const material = new THREE.MeshStandardMaterial( {color: color, map:texture } );
      
      //let material = new THREE.MeshPhongMaterial( { map: texture, side:THREE.DoubleSide } );
      let mesh = new THREE.Mesh(geometry,material)
      mesh.rotation.y = i - Math.PI/2
      mesh.position.set(Math.sin(i)*1,i/20+0.5, Math.cos(i)*1)
      mesh.castShadow = true
      scene.add(mesh)
    }
    
  }

///////////////////////////////////////////////
// LOAD ART
///////////////////////////////////////////////


  {
  const gltfLoader = new GLTFLoader();
  const url = 'https://cdn.glitch.com/c3a681de-331d-4470-9735-8bccb2887e35%2Fredgreendress.glb?v=1607493822476';
  gltfLoader.load(url, (gltf) => {
    let root = gltf.scene;
    root.scale.set(5,5,5)
    scene.add(root);
  })
  }

*/

