<template>
	<KonSelect
		placeholder="Select one"
		v-model="value"
		:items="items"
		label="Social networks"
	/>
	<KonSelect
		placeholder="Select one"
		:model-value="undefined"
		:items="items"
		label="Social networks"
		:disabled="true"
	/>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";

const items = ref(["Facebook", "Twitter", "Instagram", "Tiktok"]);
const value = ref();
</script>