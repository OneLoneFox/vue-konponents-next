import vue from "@vitejs/plugin-vue";
import { type TemplateChildNode } from "@vue/compiler-core";
import autoprefixer from "autoprefixer";
import nesting from "postcss-nesting";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

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
			exclude: ["**/__tests__/**", "cypress.d.ts", "vite-env.d.ts"],
		})
	],
	build: {
		lib: {
			entry: "src/main.ts",
			name: "vue-konponents-next",
			fileName: "vue-konponents-next",
			cssFileName: "vue-konponents-next",
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "vue"
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
