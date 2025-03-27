<template>
	<KonSelect
		placeholder="Frontend"
		v-model="frontValue"
		:items="frontends"
		label="Simple filter"
		:filter-items="true"
		search="v"
	/>
	<KonSelect
		placeholder="Frontend"
		v-model="frontValue"
		:items="frontends"
		label="Simple filter"
		:filter-items="true"
		:filter-input="true"
	/>
	<KonSelect
		placeholder="Backend"
		v-model="backValue"
		:items="backends"
		label="Object filter"
		value-attribute="id"
		text-attribute="text"
		:multiple="true"
		:filter-items="true"
		:filter-input="true"
	/>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";

const frontends = ref(["Vue", "React", "Angular", "Svelte", "Ember", "Preact"]);
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