/* generated by Svelte vX.Y.Z */
import { appendNode, assign, createElement, createText, detachNode, init, insertNode, noop, proto, setAttribute } from "svelte/shared.js";

var template = (function() {
	return {
		data: function () {
			return { foo: 42 }
		}
	};
}());

function encapsulateStyles(node) {
	setAttribute(node, "svelte-3590263702", "");
}

function add_css() {
	var style = createElement("style");
	style.id = 'svelte-3590263702-style';
	style.textContent = "p[svelte-3590263702],[svelte-3590263702] p{color:red}";
	appendNode(style, document.head);
}

function create_main_fragment(state, component) {
	var p, text;

	return {
		c: function create() {
			p = createElement("p");
			text = createText(state.foo);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(p);
		},

		m: function mount(target, anchor) {
			insertNode(p, target, anchor);
			appendNode(text, p);
		},

		p: function update(changed, state) {
			if (changed.foo) {
				text.data = state.foo;
			}
		},

		u: function unmount() {
			detachNode(p);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(template.data(), options.data);

	if (!document.getElementById("svelte-3590263702-style")) add_css();

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;