<template>
	<KonSelect
		placeholder="Frontend"
		v-model="frontValue"
		:items="frontends"
		label="Frontend"
		value-attribute="id"
		text-attribute="text"
	/>
	<KonSelect
		placeholder="Backend"
		v-model="backValue"
		:items="backends"
		label="Backend"
		value-attribute="id"
		text-attribute="text"
		:multiple="true"
	/>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";

const frontends = ref([
	{
		id: 1,
		text: "Vue"
	},
	{
		id: 2,
		text: "React"
	},
	{
		id: 3,
		text: "Angular"
	},
	{
		id: 4,
		text: "Svelte"
	},
	{
		id: 5,
		text: "Ember"
	},
	{
		id: 6,
		text: "Preact"
	},
]);
const backends = ref([
	{
		id: 1,
		text: "Django"
	},
	{
		id: 2,
		text: "Laravel"
	},
	{
		id: 3,
		text: "Express"
	},
	{
		id: 4,
		text: "Symfony"
	},
	{
		id: 5,
		text: "Ruby on Rails"
	},
	{
		id: 6,
		text: "Flask"
	},
	{
		id: 7,
		text: ".NET"
	},
]);
const frontValue = ref();
const backValue = ref([]);
</script>