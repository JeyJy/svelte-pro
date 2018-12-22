/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, addListener, append, createElement, createText, detachNode, init, insert, run, safe_not_equal, setData } from "svelte/internal";

function create_fragment(component, ctx) {
	var button, text1, p, text2, text3_value = ctx.things.length, text3, current, dispose;

	return {
		c() {
			button = createElement("button");
			button.textContent = "foo";
			text1 = createText("\n\n");
			p = createElement("p");
			text2 = createText("number of things: ");
			text3 = createText(text3_value);
			dispose = addListener(button, "click", ctx.click_handler);
		},

		m(target, anchor) {
			insert(target, button, anchor);
			insert(target, text1, anchor);
			insert(target, p, anchor);
			append(p, text2);
			append(p, text3);
			current = true;
		},

		p(changed, ctx) {
			if ((changed.things) && text3_value !== (text3_value = ctx.things.length)) {
				setData(text3, text3_value);
			}
		},

		i(target, anchor) {
			if (current) return;
			this.m(target, anchor);
		},

		o: run,

		d(detach) {
			if (detach) {
				detachNode(button);
				detachNode(text1);
				detachNode(p);
			}

			dispose();
		}
	};
}

function define($$self, $$props, $$make_dirty) {
	let things = [];

	function click_handler() { things.push(1); $$make_dirty('things') }

	$$self.$$.get = () => ({ things, click_handler });
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, define, create_fragment, safe_not_equal);
	}
}

export default SvelteComponent;