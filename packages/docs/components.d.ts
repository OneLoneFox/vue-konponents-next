import DocExample from "./.vitepress/global-components/DocExample.vue";
import ExampleColumn from "./.vitepress/global-components/ExampleColumn.vue";
import ExampleRow from "./.vitepress/global-components/ExampleRow.vue";

export { };

declare module 'vue' {
	interface GlobalComponents {
		DocExample: typeof DocExample;
		ExampleColumn: typeof ExampleColumn;
		ExampleRow: typeof ExampleRow;
	}
}