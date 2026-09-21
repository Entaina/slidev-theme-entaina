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
