<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;border:3px solid red">
	<form>
		<br/>
		<br/>
		<input placeholder="name"></input>
		<br/>
		<br/>
		<button>set name</button>
	</form>
</div>

let name = localStorage.getItem('playeruuid');
if(!name) {
//	name = generateUID()
//	localStorage.setItem('playeruuid',name)
//	console.log("Setting local player id "  + name)
}
