import {
	SvelteComponent,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_style
} from "svelte/internal";

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			set_style(div, "color", ctx.color);
			set_style(div, "transform", "translate(" + ctx.x + "px," + ctx.y + "px)");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(changed, ctx) {
			if (changed.color) {
				set_style(div, "color", ctx.color);
			}

			if (changed.x || changed.y) {
				set_style(div, "transform", "translate(" + ctx.x + "px," + ctx.y + "px)");
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { color } = $$props;
	let { x } = $$props;
	let { y } = $$props;

	$$self.$set = $$props => {
		if ("color" in $$props) $$invalidate("color", color = $$props.color);
		if ("x" in $$props) $$invalidate("x", x = $$props.x);
		if ("y" in $$props) $$invalidate("y", y = $$props.y);
	};

	return { color, x, y };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { color: 0, x: 0, y: 0 });
	}
}

export default Component;