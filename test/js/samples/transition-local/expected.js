import {
	SvelteComponent,
	add_render_callback,
	create_in_transition,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal,
	transition_in
} from "svelte/internal";

function create_if_block(ctx) {
	let if_block_anchor;
	let if_block = ctx.y && create_if_block_1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(changed, ctx) {
			if (ctx.y) {
				if (!if_block) {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					transition_in(if_block, 1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_if_block_1(ctx) {
	let div;
	let div_intro;

	return {
		c() {
			div = element("div");
			div.textContent = "...";
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		i(local) {
			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, foo, {});
						div_intro.start();
					});
				}
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = ctx.x && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(changed, ctx) {
			if (ctx.x) {
				if (if_block) {
					if_block.p(changed, ctx);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function foo() {
	
}

function instance($$self, $$props, $$invalidate) {
	let { x } = $$props;
	let { y } = $$props;

	$$self.$set = $$props => {
		if ("x" in $$props) $$invalidate("x", x = $$props.x);
		if ("y" in $$props) $$invalidate("y", y = $$props.y);
	};

	return { x, y };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { x: 0, y: 0 });
	}
}

export default Component;