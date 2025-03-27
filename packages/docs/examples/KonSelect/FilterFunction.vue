<template>
	<KonSelect
		label="Fuzzy search"
		placeholder="Frontend"
		v-model="frontValue"
		:items="frontends"
		:filter-items="true"
		:filter-input="true"
		:filter-fn="fuzzySearch"
	/>
	<KonSelect
		label="Object search"
		placeholder="Search by lang"
		v-model="backValue"
		:items="backends"
		value-attribute="id"
		text-attribute="text"
		:multiple="true"
		:filter-items="true"
		:filter-input="true"
		:filter-fn="searchByLang"
	/>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";
import Fuse from "fuse.js";

type ItemType = { id: number; text: string; lang: string };

function fuzzySearch(items: string[], searchTerm: string): string[]{
	const fuse = new Fuse(items, {
		shouldSort: true,
	});
	return fuse.search(searchTerm).map(({ item }) => {
		return item;
	});
}

function searchByLang(items: ItemType[], searchTerm: string): ItemType[]{
	const search = searchTerm.toLowerCase();
	return items.filter((item) => {
		const itemText = item.lang.toLocaleLowerCase();
		return itemText.includes(search);
	});
}

const frontends = ref(["Vue", "React", "Angular", "Svelte", "Ember", "Preact"]);
const backends = ref<ItemType[]>([
	{
		id: 1,
		text: "Django",
		lang: "Python",
	},
	{
		id: 2,
		text: "Laravel",
		lang: "PHP"
	},
	{
		id: 3,
		text: "Express",
		lang: "Javascript"
	},
	{
		id: 4,
		text: "Symfony",
		lang: "PHP"
	},
	{
		id: 5,
		text: "Ruby on Rails",
		lang: "Ruby"
	},
	{
		id: 6,
		text: "Flask",
		lang: "Python"
	},
	{
		id: 7,
		text: ".NET",
		lang: "C#"
	},
]);
const frontValue = ref();
const backValue = ref<ItemType[]>([]);
</script>