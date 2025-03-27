<template>
	<KonSelect
		placeholder="Select some"
		v-model="value"
		:items="items"
		label="Social networks"
		:multiple="true"
	/>
	<KonSelect
		placeholder="Select some"
		:model-value="['Facebook']"
		:items="items"
		label="Social networks"
		:disabled="true"
		:multiple="true"
	/>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";

const items = ref(["Facebook", "Twitter", "Instagram", "Tiktok"]);
const value = ref([]);
</script>