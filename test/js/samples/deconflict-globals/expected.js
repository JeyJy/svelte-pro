/* generated by Svelte vX.Y.Z */
import { assign, callAll, init, noop, proto } from "svelte/shared.js";

function data_1() {
	return {
	foo: 'bar'
};
}

function oncreate() {
	alert(JSON.stringify(data()));
};

function create_main_fragment(state, component) {

	return {
		c: noop,

		m: noop,

		p: noop,

		u: noop,

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(data_1(), options.data);

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;