/* generated by Svelte vX.Y.Z */
import { assign, createElement, detachNode, init, insert, noop, proto } from "svelte/shared.js";

function create_main_fragment(component, ctx) {
	var div;

	return {
		c() {
			div = createElement("div");
			div.textContent = "fades in";
			this.c = noop;
		},

		m(target, anchor) {
			insert(target, div, anchor);
		},

		p: noop,

		d(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

class SvelteComponent extends HTMLElement {
	constructor(options = {}) {
		super();
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>div{animation:foo 1s}@keyframes foo{0%{opacity:0}100%{opacity:1}}</style>`;

		this._fragment = create_main_fragment(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}
}

assign(SvelteComponent.prototype, proto);
assign(SvelteComponent.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("custom-element", SvelteComponent);
export default SvelteComponent;