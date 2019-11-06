import { SvelteComponent, init, safe_not_equal } from "svelte/internal";

function instance($$self, $$props, $$invalidate) {
	let { a = 1 } = $$props;
	let { b = 2 } = $$props;

	$$self.$set = $$props => {
		if ("a" in $$props) $$invalidate("a", a = $$props.a);
		if ("b" in $$props) $$invalidate("b", b = $$props.b);
	};

	$$self.$$.update = (changed = { a: 1, b: 1 }) => {
		if (changed.a || changed.b) {
			$: console.log("max", Math.max(a, b));
		}
	};

	return { a, b };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, null, safe_not_equal, { a: 0, b: 0 });
	}
}

export default Component;