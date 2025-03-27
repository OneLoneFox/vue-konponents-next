<template>
	<KonSelect
		placeholder="Select one"
		v-model="value"
		:items="items"
		label="Social networks"
		:multiple="true"
		:collapse-chips="true"
	/>
	<KonSelect
		placeholder="Select some"
		v-model="value"
		:items="items"
		label="Social networks"
		:multiple="true"
		:collapse-chips="true"
		:max-chips="3"
	/>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";

const items = ref(["Facebook", "Twitter", "Instagram", "Tiktok"]);
const value = ref(["Facebook", "Twitter", "Instagram", "Tiktok"]);
</script>