import DocExample from "./.vitepress/global-components/DocExample.vue";

export { };

declare module 'vue' {
	interface GlobalComponents {
		DocExample: typeof DocExample;
	}
}