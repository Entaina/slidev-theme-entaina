import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(ROOT, path), "utf8");

// The public token contract of this theme. tokens.css must define every one;
// base.css and the chrome may consume nothing outside it unless they carry an
// explicit var(--x, fallback).
const CONTRACT = [
	"--bg", "--surface", "--surface2", "--surface-elevated",
	"--border", "--border-bright", "--text", "--text-dim",
	"--accent", "--accent-dim",
	"--node-a", "--node-a-dim", "--node-b", "--node-b-dim", "--node-c", "--node-c-dim",
	"--green", "--green-dim", "--red", "--red-dim", "--orange", "--orange-dim",
	"--code-bg", "--code-text",
	"--font-display", "--font-body", "--font-mono",
];

test("tokens.css defines the full contract", () => {
	const defined = new Set([...read("styles/tokens.css").matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
	const missing = CONTRACT.filter((token) => !defined.has(token));
	assert.deepEqual(missing, []);
});

for (const file of ["styles/base.css", "global-top.vue"]) {
	test(`${file} consumes only contract tokens (or carries a fallback)`, () => {
		const source = read(file);
		const violations = [...source.matchAll(/var\(\s*(--[a-z0-9-]+)\s*([,)])/g)]
			.filter(([, token, delimiter]) => !CONTRACT.includes(token) && delimiter !== ",")
			.map(([, token]) => token);
		assert.deepEqual([...new Set(violations)], []);
	});
}

test("pillar variants redefine only tokens that :root defines", () => {
	const tokens = read("styles/tokens.css");
	const rootDefined = new Set([...tokens.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
	for (const variant of tokens.matchAll(/\[data-theme="[a-z]+"\]\s*{([\s\S]*?)}/g)) {
		const defined = [...variant[1].matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]);
		const foreign = defined.filter((token) => !rootDefined.has(token));
		assert.deepEqual(foreign, []);
	}
});

test("full-bleed covers support the class and imported-slide marker through one variant", () => {
	const base = read("styles/base.css");
	const selector = ".slidev-layout.cover:is(.bleed, :has(.bleed-note))";
	assert.ok(base.includes(`${selector} {`));
	assert.ok(base.includes(`${selector}::before {`));
	const grid = base.match(/\.slidev-layout\.cover:is\(\.bleed, :has\(\.bleed-note\)\)::before\s*{([\s\S]*?)}/)?.[1] || "";
	assert.match(grid, /height: auto;/);
	assert.doesNotMatch(base, /\.slidev-layout\.cover\.bleed/);
});

test("long-deck navigation uses the accessible theme compact mode", () => {
	const chrome = read("global-top.vue");
	assert.match(chrome, /const isCompact = computed\(\(\) => total\.value >= 50\)/);
	assert.match(chrome, /:class="\['deck-dots', \{ 'deck-dots--compact': isCompact \}\]"/);
	assert.match(chrome, /\.deck-dots--compact\s*{\s*gap: 1px;/);
	assert.doesNotMatch(chrome, /:has\([^}]*\.deck-dot:nth-child/);

	const rail = chrome.match(/\.deck-dots\s*{([\s\S]*?)}/)?.[1] || "";
	assert.match(rail, /max-height: calc\(70dvh \/ var\(--slidev-slide-scale, 1\)\);/);
	assert.match(rail, /overflow: hidden auto;/);
	assert.match(rail, /padding: 7px;/);
	assert.match(rail, /width: 38px;/);

	const target = chrome.match(/\.deck-dot\s*{([\s\S]*?)}/)?.[1] || "";
	assert.match(target, /min-height: 24px;/);
	assert.match(target, /min-width: 24px;/);
	assert.match(chrome, /aria-label="Navegación por diapositivas"/);
	assert.match(chrome, /:aria-label="`Ir a \$\{t}`"/);
	assert.match(chrome, /:focus-within/);
	assert.match(chrome, /:focus-visible/);
});
