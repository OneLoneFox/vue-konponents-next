<template>
	<Layout>
		<template #home-hero-image>
			<p>Placeholder for cool component showcase</p>
		</template>
	</Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { watch } from "vue";

const { Layout } = DefaultTheme;
const isDark = useData().isDark;

watch(isDark, () => {
	if(isDark.value){
		document.documentElement.setAttribute("kon-theme", "dark");
	}else{
		document.documentElement.removeAttribute("kon-theme");
	}
}, { immediate: true });
</script>