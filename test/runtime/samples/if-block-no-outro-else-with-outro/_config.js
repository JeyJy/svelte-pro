export default {
	nestedTransitions: true,

	html: '<div>A wild component appears</div><p>x</p><input type="text">',

	test(assert, component, target) {
		component.set({ x: 'y' });
		assert.htmlEqual(target.innerHTML, '<div>A wild component appears</div><p>y</p><input type="text">');
	},
};
