import * as components from "./components";
import { type CreateKonfig, createKonponents as _create } from "./createKonponents";
import "./styles/style.css";

export function createKonponents(config: CreateKonfig = {}) {
	const userConfig: CreateKonfig = { components: components, ...config };
	return _create(userConfig);
}

export * from "./components";

declare module "vue" {
	interface GlobalComponents {
		KonButton: typeof components.KonButton;
		KonProgressCircular: typeof components.KonProgressCircular;
		KonProgressLinear: typeof components.KonProgressLinear;
	}
}