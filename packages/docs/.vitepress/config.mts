import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Konponents Next",
	description: "Documentation site for the Konponents Next component library",
	srcDir: "./src",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{
				text: "Guide",
				items: [
					{ text: "Getting started", link: "/guide/getting-started" }
				]
			},
			{
				text: "Components",
				items: [
					{ text: "Button", link: "/components/button" },
					{ text: "Circular Progress", link: "/components/circular-progress" },
					{ text: "Linear Progress", link: "/components/linear-progress" },
				]
			},
			{ text: "Examples", link: "/markdown-examples" }
		],

		sidebar: [
			{
				text: "Examples",
				items: [
					{ text: "Markdown Examples", link: "/markdown-examples" },
					{ text: "Runtime API Examples", link: "/api-examples" }
				]
			}
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/vuejs/vitepress" }
		]
	}
});
