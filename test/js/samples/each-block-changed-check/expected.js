/* generated by Svelte vX.Y.Z */
import { appendNode, assign, createElement, createText, destroyEach, detachAfter, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function create_main_fragment(component, ctx) {
	var text, p, text_1;

	var each_value = ctx.comments;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text = createText("\n\n");
			p = createElement("p");
			text_1 = createText(ctx.foo);
		},

		m(target, anchor) {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insertNode(text, target, anchor);
			insertNode(p, target, anchor);
			appendNode(text_1, p);
		},

		p(changed, ctx) {
			if (changed.comments || changed.elapsed || changed.time) {
				each_value = ctx.comments;

				for (var i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block(component, child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(text.parentNode, text);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = each_value.length;
			}

			if (changed.foo) {
				text_1.data = ctx.foo;
			}
		},

		u() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			detachNode(text);
			detachNode(p);
		},

		d() {
			destroyEach(each_blocks);
		}
	};
}

// (1:0) {#each comments as comment, i}
function create_each_block(component, ctx) {
	var div, strong, text, text_1, span, text_2_value = ctx.comment.author, text_2, text_3, text_4_value = ctx.elapsed(ctx.comment.time, ctx.time), text_4, text_5, text_6, raw_value = ctx.comment.html, raw_before;

	return {
		c() {
			div = createElement("div");
			strong = createElement("strong");
			text = createText(ctx.i);
			text_1 = createText("\n\n\t\t");
			span = createElement("span");
			text_2 = createText(text_2_value);
			text_3 = createText(" wrote ");
			text_4 = createText(text_4_value);
			text_5 = createText(" ago:");
			text_6 = createText("\n\n\t\t");
			raw_before = createElement('noscript');
			span.className = "meta";
			div.className = "comment";
		},

		m(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(strong, div);
			appendNode(text, strong);
			appendNode(text_1, div);
			appendNode(span, div);
			appendNode(text_2, span);
			appendNode(text_3, span);
			appendNode(text_4, span);
			appendNode(text_5, span);
			appendNode(text_6, div);
			appendNode(raw_before, div);
			raw_before.insertAdjacentHTML("afterend", raw_value);
		},

		p(changed, ctx) {
			if ((changed.comments) && text_2_value !== (text_2_value = ctx.comment.author)) {
				text_2.data = text_2_value;
			}

			if ((changed.elapsed || changed.comments || changed.time) && text_4_value !== (text_4_value = ctx.elapsed(ctx.comment.time, ctx.time))) {
				text_4.data = text_4_value;
			}

			if ((changed.comments) && raw_value !== (raw_value = ctx.comment.html)) {
				detachAfter(raw_before);
				raw_before.insertAdjacentHTML("afterend", raw_value);
			}
		},

		u() {
			detachAfter(raw_before);

			detachNode(div);
		},

		d: noop
	};
}

function get_each_context(ctx, list, i) {
	return assign(assign({}, ctx), {
		comment: list[i],
		each_value: list,
		i: i
	});
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;