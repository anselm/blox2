# BLOX 2

<img src="https://github.com/anselm/blox2/blob/main/example.png?raw=true"></img>

Blox is a modular scripting language for building applications. It's more a "formalism" in that it is not hard for a programmer to circumvent, but the hope is that if programmers can work with novices, then we can have grammars that allow more participation.

Some of the earlier thinking that has lead to this iteration can be found here:

1. https://github.com/anselm/blox (first pass thinking that had a more complicated engine than this one)
2. https://anselm.medium.com/draft-visual-typewriters-telling-stories-in-3d-7cba736dfdb4

## Running

node server.js

## Scenes

A scene or world or "pile of stuff" is a collection of blox that can describe something useful - like a 3d world. Here is an example 3d world. The root node itself is a blox, that is a 3d renderer. It contains children blox, that paint the ground and other elements. There are children blox that implement behaviors in an ECS like paradigm.

```
export let myworld = {
	blox:"/blox/3d/render",
	mywalkgrab:{
		blox:"/blox/3d/walkgrab",
	},
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
	}
}
```

## Blox Properties

A blox is a node in a modular programming language. It is a largely declarative object (in javascript for now) that also has a few helper methods. Blox are intended to be wired together in a DAG and to handle events.

Field properties of a blox include:

	- owner
	- uuid
	- flavor/kind ( a blox can represent a blog post, or a 3d object or any other concept)
	- name
	- description
	- image
	- sigil
	- permissions
	- parent, position, orientation, scale
	- value
	- created
	- updated

There are also a few methods:

	onload() -> a special way to inject the entirety of json description from disk

	onprops() -> a way to populate this blox from a json description passed by hand

	onready() -> called when a blox is done loading

	onchild() -> a way to add a child to this blox

	toJSON() -> convert this blox to json

	ondelete() -> notification that this blox is being deleted soon

	onchilddelete() -> notification that a child is being deleted

	onreceive() -> changes inbound from somewhere (such as a network) that this blox needs to handle

## BUGS

	- smarter temp loading obj anim
	- more controls for nav- support on phone
	- 3js complains about colors
	- i need to reduce the weight on onprops() at least as used by subclasses - examine???
	- right now as well the renderer still has to be made before the children and that is a bit mess
	- net some kind of idle timer to kill old sockets and their children

## PHILOSOPHY

We live in a world filled with different kinds of jobs, roles, skills. Some of us are social workers, some are pure artists, some of us practice law and understand a complex legal landscape. Some of us are architects, understanding issues around building codes and the kinds of structures that humans like to inhabit. Many of us have at one time or another worked in service industry jobs, catering, bussing, even just washing dishes. Some of us are plumbers, or electricians, or teach high-school kids, or just write books, or technical documentation, a few of us play with financial markets or have the freedom to just travel and explore the world at our leisure.

In all of these occupations there's a real commonality; there's a sense of needing to understand both the subjects and the tools. Artists may be examining or critiquing society itself; creating work that is an exploration or a riff on something they perceive. A variety of tools are used to execute their work; and in a sense the work is expressed in the breath or voice of the tools themselves to some degree. Oil behaves differently from acrylic and sculpture is different from film. Similarily a pianist may approach a piano as a way to capture an idea or expression that they've heard or imagined. There's an interplay between the subject matter and its expression. A piano as an instrument may seems like a complicated baroque device, but to a pianist, amateur or professional, it has depth; it's broken down into capabilities, techniques, memorization of notes and keys and so on.

What's a bit unusual about programming is that it is more invisible to outsiders than many other trades. An architect can show you a diagram that roughly corresponds to the building they are going to build. A plumber can show you a p-trap and explain what it does and why. A writer can talk through the larger elements they are weaving into a story. But programming uses a representation of work that isn't entirely the same as the target output. A few lines of code don't always convey what is being done. For example - this draws a box but it is not obviously so - especially to an outsider:

		drawline(0,0,10,0)
		drawline(10,0,10,10)
		drawline(10,10,0,10)
		drawline(0,10,0,0)

I've always wanted to share my work, share how much fun it is to program. But it's always been challenging because many things worth building are hard to communicate. You can communicate the results - a video game or an experience or a software toy - but it's hard to share the actual work itself - the actual source code - and have anybody other than a few people understand it.

The question I want to explore here is "Is there a way to represent work that is visible not only to novices but to say any working professional in any other industry?" Or - "Is there a computer grammar that is suitable for both novices and professionals?"

Of course it's possible to make ordinary programming code a bit more clear and more legible - so that the prose is readable by novices. But even then software systems can be extremely complex - and you can end up with thousands of pages of text. While it's true that you can abstract even this - finding the right abstraction is tricky - it becomes a lot of work for a programmer to make their work visible to a novice. There's a tension between being succinct for an expert programmer and being clear for a novice. Of course there are many toy languages that make code simple and clear for novices, but they simply don't scale. I haven't seen any that are useful for professionals. Visa versa, there are many exquisite and succinct grammars (that I love) but that are totally inappropriate for novices; that would be like handing a novice a box of razor blades and telling them to make a toaster.

What we want is accessibility, without giving up accuracy. Representations (grammars, languages and so on) often are more than simply whatever random ideas we think up. The best ones help bracket and illuminate underlying rules - the physics of the realm. A piano is tied to the physics of the world in how it maps the idea of octaves to notes. Piano staff notation reflects these physics - showing notes that correspond to keys and implying a progression over time. These cues guide user behavior. In programming there are similar guides. One can declare that something is something such as "x = 12" and then perform conditional evaluation over time such as "if x > 12 then do something". These commands are also arranged in a way that implies the passage of time - because time is a domain that both pianos and computers operate in. All these best practices and guardrails are embedded in the grammars that we use.

If people knew how easy it was to program - how similar it is to say plumbing, or electrical, or architecture - many more people would do it. There's a mystique around programming and in fact a kind of culture or priesthood where programmers often offer to do work for other people, but don't often empower other people to do the work themselves. Many of the kinds of things we pass off to professionals could in fact be done ourselves. And I'd argue that in an emerging world with all kinds of interacting devices in our homes and all around us - that programming should be seen as something that everybody does. It should be fairly accessible without too much work for those who are interested. Programming is also a powerful tool, and civic access to tools like this can help our society as a whole.

## General thoughts and approaches

HISTORY. In this project what I want to do is look at earlier thinking around making programming accessible, and then play with grammars that would be useful both for novices and experts. Many experts such as Alan Kay and Brett Victor have thought about this a lot already. There's a very long history of thinking about programming as a whole as well - all the way back to Turing. Notables include Minksy as well: https://www.gwern.net/docs/www/web.media.mit.edu/b8c7bfd0757330c92e0f0f52a1ddc70b15468c26.html . Also see Alan's work at: https://en.wikipedia.org/wiki/Alan_Kay#Squeak,_Etoys,_and_Croquet

VISUAL. I lean towards a visual flow diagram language. I'd like to use color and animation in representing code; I feel we have richer displays and can use more capabilities of those displays. At the same time I do believe that it should work for color blind people. Ordinary flowcharts, finite state machines and UML diagrams can be seen as visual programming foundations. Wikipedia has others as well: https://en.wikipedia.org/wiki/Visual_programming_language . I do want to leverage some of that thinking - but it is worth noting that there can be a tension between the components of a system and how execution flows through a system. I lean towards representation of the parts, more than representation of the execution flow. I do want to show relationships between parts, but I prefer to have the parts themselves be predominant.

HIGH LEVEL. Note that I'm not a fan of languages like Pure Data or Max MSP, Unity3D Bolt or even Unreal Blueprints. These are too low level and are basically the same as text. I'm not a fan of scratch which is basically text with visual blocks. Those tools are intended in a sense as bridges or tutorials on programming itself - they're far to slow, verbose and messy.

TEXT. There must be a succinct text based representation. I'm strongly opposed to visual only. In existing visual tools one cannot communicate an idea without sharing a Youtube video! I also lean away from naive or trivial visual grammars that are literal transcriptions of text to visual boxes. The text may be declarative only - rather than expressing logic.

OVERVIEW EFFECT. Visually I'm interested in something that provides what I call an "overview effect" where somebody can look at the broad strokes of a project and get some understanding, and then drill down from there in more detail if they want.

WIDE AUDIENCE. I imagine a target audience that is people 8 years old and up. That is multiplayer, that can consist of real working professionals, that allows people to work separately, sharing modular components and or work from existing tools, that is of course efficient and actually useful. The target audience shouldn't be restricted to new users doing new projects - but rather should dovetail with existing work and habits by existing professionals.

SOUP. Beyond the basics I'm also interested in an idea of self-assembling soups. I've noticed that often we over-express how things tie together, and instead if we can just express how they should connect, then the actual connections can be done automatically.

ECS. I'm interested in using an entity component model; where there's a concept of a bucket or bag of handlers, and the handlers themselves do all the work. I want to avoid c++ style class hieararchies, and I am somewhat interested in prototype based composition, but I am also more interested in how something is defined by what it chooses to decorate itself with. I'm less focused on strict object property sheets or say any kind of relational database model.

DAGS. I'm somewhat attracted to the idea of DAGs (directed acyclic graphs) which are used to great effect in say Unity3D. I do think representing state as a dependency graph is an effective concept.

GAME AUTHORING. Often I've built tools for artists and designers to describe video game levels. This ranges from tools to make actual tile based maps, and actual 3d art, to higher level tools that express where game triggers are, how events are wired together, the properties of the various in game characters, and how they respond to the user. In a sense these are similar in a way because they let novices describe all the aspects of a video game without themselves programming.

GOOD EXAMPLES TO DRIVE USE. A good test or validation of a grammar like this is that it should be possible to represent diverse projects from new musical instruments, to ordinary web sites to interactive games. And it would be nice to have a bunch of examples shown in both traditional languages and this new language. Some examples of things that might be nice to be able to build include say a toy piano like dotpiano.com, or something similar to the ableton instrument system or even ableton clips. It might be nice to create alternative musical instruments with their own voicing (say embedded in arduino hardware) and even explore some simple VR experiences such as say the experience of walking through a cherry blossom orchard with the petals falling.


