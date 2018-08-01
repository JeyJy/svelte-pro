# Svelte

The magical disappearing UI framework.

* [Read the introductory blog post](https://svelte.technology/blog/frameworks-without-the-framework)
* [Read the guide](https://svelte.technology/guide)
* [Try it out](https://svelte.technology/repl)
* [Chat on Discord](https://discord.gg/yy75DKs)

---

## Tooling

This is the Svelte compiler, which is primarily intended for authors of tooling that integrates Svelte with different build systems. If you just want to write Svelte components and use them in your app, you probably want one of those tools:

### Build Systems

* [gulp-svelte](https://github.com/shinnn/gulp-svelte) - gulp plugin
* [metalsmith-svelte](https://github.com/shinnn/metalsmith-svelte) - Metalsmith plugin
* [system-svelte](https://github.com/CanopyTax/system-svelte) – System.js loader
* [svelte-loader](https://github.com/sveltejs/svelte-loader) – Webpack loader
* [meteor-svelte](https://github.com/klaussner/meteor-svelte) – Meteor build plugin
* [sveltejs-brunch](https://github.com/StarpTech/sveltejs-brunch) – Brunch build plugin
* [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte) – Rollup plugin
* [parcel-plugin-svelte](https://github.com/DeMoorJasper/parcel-plugin-svelte) - Parcel build plugin
* [sveltify](https://github.com/tehshrike/sveltify) - Browserify transform

### Additional tools

* [svelte-dev-store](https://github.com/GarethOates/svelte-dev-store) - Use Redux tools to visualise Svelte store
* More to come!

## Example usage

```js
import * as svelte from 'svelte';

const { js, css, ast } = svelte.compile(source, {
	// the target module format – defaults to 'es' (ES2015 modules), can
	// also be 'amd', 'cjs', 'umd', 'iife' or 'eval'
	format: 'umd',

	// the filename of the source file, used in e.g. generating sourcemaps
	filename: 'MyComponent.html',

	// the name of the constructor. Required for 'iife' and 'umd' output,
	// but otherwise mostly useful for debugging. Defaults to 'SvelteComponent'
	name: 'MyComponent',

	// for 'amd' and 'umd' output, you can optionally specify an AMD module ID
	amd: {
		id: 'my-component'
	},

	// custom error/warning handlers. By default, errors will throw, and
	// warnings will be printed to the console. Where applicable, the
	// error/warning object will have `pos`, `loc` and `frame` properties
	onerror: err => {
		console.error( err.message );
	},

	onwarn: warning => {
		console.warn( warning.message );
	}
});
```


## API

The Svelte compiler exposes the following API:

* `compile(source [, options]) => { js, css, ast }` - Compile the component with the given options (see below). Returns an object containing the compiled JavaScript, a sourcemap, an AST and transformed CSS.
* `create(source [, options]) => function` - Compile the component and return the component itself.
* `preprocess(source, options) => Promise` — Preprocess a source file, e.g. to use PostCSS or CoffeeScript
* `VERSION` - The version of this copy of the Svelte compiler as a string, `'x.x.x'`.

### Compiler options

The Svelte compiler optionally takes a second argument, an object of configuration options:

| | **Values** | **Description** | **Default** |
|---|---|---|---|
| `generate` | `'dom'`, `'ssr'`, `false` | Whether to generate JavaScript code intended for use on the client (`'dom'`), or for use in server-side rendering (`'ssr'`). If `false`, component will be parsed and validated but no code will be emitted | `'dom'` |
| `dev` | `true`, `false` | Whether to enable run-time checks in the compiled component. These are helpful during development, but slow your component down. | `false` |
| `css` | `true`, `false` | Whether to include code to inject your component's styles into the DOM. | `true` |
| `hydratable` | `true`, `false` | Whether to support hydration on the compiled component. | `false` |
| `customElement` | `true`, `false`, `{ tag, props }` | Whether to compile this component to a custom element. If `tag`/`props` are passed, compiles to a custom element and overrides the values exported by the component. | `false` |
| `bind` | `boolean` | If `false`, disallows `bind:` directives | `true` |
| | | |
| `shared` | `true`, `false`, `string` | Whether to import various helpers from a shared external library. When you have a project with multiple components, this reduces the overall size of your JavaScript bundle, at the expense of having immediately-usable component. You can pass a string of the module path to use, or `true` will import from `'svelte/shared.js'`. | `false` |
| `legacy` | `true`, `false` | Ensures compatibility with very old browsers, at the cost of some extra code. | `false` |
| | | |
| `format` | `'es'`, `'amd'`, `'cjs'`, `'umd'`, `'iife'`, `'eval'` | The format to output in the compiled component.<br>`'es'` - ES6/ES2015 module, suitable for consumption by a bundler<br>`'amd'` - AMD module<br>`'cjs'` - CommonJS module<br>`'umd'` - UMD module<br>`'iife'` - IIFE-wrapped function defining a global variable, suitable for use directly in browser<br>`'eval'` - standalone function, suitable for passing to `eval()` | `'es'` for `generate: 'dom'`<br>`'cjs'` for `generate: 'ssr'` |
| `name` | `string` | The name of the constructor in the compiled component. | `'SvelteComponent'` |
| `filename` | `string` | The filename to use in sourcemaps and compiler error and warning messages. | `'SvelteComponent.html'` |
| `amd`.`id` | `string` | The AMD module ID to use for the `'amd'` and `'umd'` output formats. | `undefined` |
| `globals` | `object`, `function` | When outputting to the `'umd'`, `'iife'` or `'eval'` formats, an object or function mapping the names of imported dependencies to the names of global variables. | `{}` |
| `preserveComments` | `boolean` | Include comments in rendering. Currently, only applies to SSR rendering | `false` |
| | | |
| `onerror` | `function` | Specify a callback for when Svelte encounters an error while compiling the component. Passed two arguments: the error object, and another function that is Svelte's default onerror handling. | (exception is thrown) |
| `onwarn` | `function` | Specify a callback for when Svelte encounters a non-fatal warning while compiling the component. Passed two arguments: the warning object, and another function that is Svelte's default onwarn handling. | (warning is logged to console) |

### Preprocessor options

`svelte.preprocess` returns a Promise that resolves to an object with a `toString` method (other properties will be added in future). It takes an options object with `markup`, `style` or `script` properties:

```js
const processed = await svelte.preprocess(source, {
	markup: ({ content }) => {
		// `content` is the entire component string
		return { code: '...', map: {...} };
	},

	style: ({ content, attributes }) => {
		// `content` is what's inside the <style> element, if present
		// `attributes` is a map of attributes on the element
		if (attributes.type !== 'text/scss') return;
		return { code: '...', map: {...} };
	},

	script: ({ content, attributes }) => {
		// `content` is what's inside the <script> element, if present
		// `attributes` is a map of attributes on the element
		if (attributes.type !== 'text/coffeescript') return;
		return { code: '...', map: {...} };
	}
});
```

The `style` and `script` preprocessors will run *after* the `markup` preprocessor. Each preprocessor can return a) nothing (in which case no transformation takes place), b) a `{ code, map }` object, or c) a Promise that resolves to a) or b). Note that sourcemaps are currently discarded, but will be used in future versions of Svelte.

## Example/starter repos

* [charpeni/svelte-example](https://github.com/charpeni/svelte-example) - Some Svelte examples with configured Rollup, Babel, ESLint, directives, Two-Way binding, and nested components
* [EmilTholin/svelte-test](https://github.com/EmilTholin/svelte-test)
* [lukechinworth/codenames](https://github.com/lukechinworth/codenames/tree/svelte) – example integration with Redux
* [khtdr/svelte-redux-shopping-cart](https://github.com/khtdr/svelte-redux-shopping-cart) – Redux Shopping Cart example (with devtools and hot-reloading)

## BrowserStack
<img src="https://cdn.worldvectorlogo.com/logos/browserstack.svg" height="80" width="80" align="left">
<p>To keep Svelte's performance in check, we use BrowserStack to quickly run benchmarks for each PR that immediately give feedback to the contributor. You can see how we use BrowserStack in the <a href="https://github.com/sveltejs/svelte-bench">svelte-bench</a> project and check out BrowserStack's services on their <a href="https://www.browserstack.com/">website</a>.</p>

## Development

Pull requests are encouraged and always welcome. [Pick an issue](https://github.com/sveltejs/svelte/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and help us out!

To install and work on Svelte locally:

```bash
git clone git@github.com:sveltejs/svelte.git
cd svelte
npm install
npm run dev
```

### Linking to a Live Project

You can make changes locally to Svelte and test it against any Svelte project. You can also use a [default template](https://github.com/sveltejs/template) for development. Instruction on setup are found in that project repository.

From your project:

```bash
cd ~/path/to/your-svelte-project
npm install ~/path/to/svelte
```

And you should be good to test changes locally.

To undo this and link to the official latest Svelte release, just run:

```bash
npm install svelte@latest
```

### Running Tests

```bash
npm run test
```

For running single tests, you can use pattern matching:

```bash
npm run test -- -g "includes AST in svelte.compile output"
```

Alternately, you can add `solo: true` to any given `test/../_config.js` file, but **remember never to commit that setting.**

## License

[MIT](LICENSE)
