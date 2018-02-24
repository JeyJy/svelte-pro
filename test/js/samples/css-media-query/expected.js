/* generated by Svelte vX.Y.Z */
import { appendNode, assign, createElement, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function add_css() {
	var style = createElement("style");
	style.id = 'svelte-3905933315-style';
	style.textContent = "@media(min-width: 1px){div.svelte-3905933315,.svelte-3905933315 div{color:red}}";
	appendNode(style, document.head);
}

function create_main_fragment(component, state) {
	var div;

	return {
		c: function create() {
			div = createElement("div");
			this.h();
		},

		h: function hydrate() {
			div.className = "svelte-3905933315";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	if (!document.getElementById("svelte-3905933315-style")) add_css();

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;