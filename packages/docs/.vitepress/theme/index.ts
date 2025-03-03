// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import KonponentsLayout from "./KonponentsLayout.vue";
import Konponents from "konponents-next";
import "./style.css";

export default {
	extends: DefaultTheme,
	Layout: KonponentsLayout,
	enhanceApp({ app, router, siteData }) {
		app.use(Konponents);
	}
} satisfies Theme;
