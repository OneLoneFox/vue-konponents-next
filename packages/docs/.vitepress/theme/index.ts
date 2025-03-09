// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import KonponentsLayout from "./KonponentsLayout.vue";
import { createKonponents } from "konponents-next";
import DocExample from "../global-components/DocExample.vue";
import "konponents-next/styles.css";
import "./style.css";

export default {
	extends: DefaultTheme,
	Layout: KonponentsLayout,
	enhanceApp({ app }) {
		const konponents = createKonponents();
		app.use(konponents);
		app.component("DocExample", DocExample);
	}
} satisfies Theme;
