import vue from "@vitejs/plugin-vue";
import { type TemplateChildNode } from "@vue/compiler-core";
import autoprefixer from "autoprefixer";
import nesting from "postcss-nesting";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";

function removeTestDataAttributes(node: TemplateChildNode) {
	if (node.type !== 1 /* ELEMENT */) return;
	node.props = node.props.filter((prop) => {
		if (prop.type !== 6 /* ATTRIBUTE */) return true;
		return prop.name !== "data-cy";
	});
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					nodeTransforms: mode === "production" ? [removeTestDataAttributes] : []
				}
			}
		}),
		dts({
			copyDtsFiles: true,
			exclude: ["**/__tests__/**", "cypress.d.ts", "src/vite-env.d.ts"],
		})
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@helpers": fileURLToPath(new URL("./src/helpers", import.meta.url))
		}
	},
	build: {
		lib: {
			entry: {
				"vue-konponents-next": "src/main.ts",
				components: "src/components/index.ts",
				helpers: "src/helpers/index.ts"
			},
			name: "vue-konponents-next",
			cssFileName: "vue-konponents-next",
			formats: ["es"]
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue"
				}
			}
		}
	},
	css: {
		postcss: {
			plugins: [autoprefixer(), nesting()]
		}
	}
}));
