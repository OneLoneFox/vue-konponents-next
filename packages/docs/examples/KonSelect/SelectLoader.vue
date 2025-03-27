<template>
	<ExampleColumn>
		<ExampleRow>
			<KonSelect
				label="Indeterminate disable"
				placeholder="Frontend"
				:model-value="undefined"
				:items="frontends"
				:loading="true"
			/>
			<KonSelect
				label="Indeterminate"
				placeholder="Frontend"
				v-model="frontValue"
				:items="frontends"
				:loading="true"
				:disable-on-loading="false"
			/>
			<KonSelect
				label="With value"
				placeholder="Frontend"
				v-model="frontValue2"
				:items="frontends"
				:loading="isLoading"
				:loading-progress="progress"
				@update:model-value="() => start()"
			/>
		</ExampleRow>
		<ExampleRow>
			<KonSelect
				label="Indeterminate disable"
				placeholder="Backend"
				:model-value="[]"
				:items="backends"
				value-attribute="id"
				text-attribute="text"
				:multiple="true"
				:loading="true"
			/>
			<KonSelect
				label="Indeterminate"
				placeholder="Backend"
				v-model="backValue"
				:items="backends"
				value-attribute="id"
				text-attribute="text"
				:multiple="true"
				:loading="true"
				:disable-on-loading="false"
			/>
			<KonSelect
				label="With value"
				placeholder="Backend"
				v-model="backValue2"
				:items="backends"
				value-attribute="id"
				text-attribute="text"
				:multiple="true"
				:loading="isLoadingM"
				:loading-progress="progressM"
				@update:model-value="() => startM()"
			/>
		</ExampleRow>
	</ExampleColumn>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";
import { useFakeLoading } from "../utils/composables";

const { isLoading, progress, start } = useFakeLoading();
const { isLoading: isLoadingM, progress: progressM, start: startM } = useFakeLoading();

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
const frontValue2 = ref();
const backValue = ref([]);
const backValue2 = ref([]);
</script>