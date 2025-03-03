import * as components from "./components";
import { type CreateKonfig, createKonponents as _create } from "./createKonponents";
import "./styles/style.css";

export function createKonponents(config: CreateKonfig) {
	const userConfig: CreateKonfig = { components: components, ...config };
	return _create(userConfig);
}

export { components };