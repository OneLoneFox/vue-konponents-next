import { defineConfig } from "vitepress";

const navComponents = [
	{ text: "Button", link: "/components/button" },
	{ text: "Select", link: "/components/select" },
	{ text: "Circular Progress", link: "/components/circular-progress" },
	{ text: "Linear Progress", link: "/components/linear-progress" },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Konponents Next",
	description: "Documentation site for the Konponents Next component library",
	srcDir: "./src",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		outline: "deep",
		nav: [
			{
				text: "Guide",
				items: [
					{ text: "Getting started", link: "/guide/getting-started" }
				]
			},
			{
				text: "Components",
				items: navComponents
			},
		],

		sidebar: [
			{
				text: "Components",
				items: navComponents
			}
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/vuejs/vitepress" }
		]
	}
});
