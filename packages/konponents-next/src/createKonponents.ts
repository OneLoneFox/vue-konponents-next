import type { App, Plugin } from "vue";

export interface CreateKonfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	components?: Record<string, any>
}

export function createKonponents(config: CreateKonfig): Plugin {
	return {
		install(app: App) {
			const { components } = config;
			for (const name in components) {
				app.component(name, components[name]);
			}
		}
	};
}