<template>
	<KonSelect placeholder="placeholder" v-model="valSimple" :items="['w', 'x', 'y', 'z']" />
	<KonSelect
		placeholder="placeholder"
		v-model="val"
		:items="options"
		value-attribute="id"
		text-attribute="text"
		:disabled-item="(item) => item.id == 1 || item.id == 2 || item.id == 3"
	/>
	<KonSelect
		placeholder="fixed"
		v-model="val"
		:items="options"
		value-attribute="id"
		text-attribute="text"
		:fixed="true"
	/>
	<select>
		<option value="1">
			value 1
		</option>
		<option value="2">
			value 2
		</option>
		<option value="3">
			value 3
		</option>
		<option value="4">
			value 4
		</option>
		<option value="5">
			value 5
		</option>
	</select>
</template>

<script setup lang="ts">
import { KonSelect } from "konponents-next";
import { ref } from "vue";

const options = ref([{ id: 1, text: "A" }, { id: 2, text: "B" }, { id: 3, text: "C" }]);
const valSimple = ref<string>(null);
const val = ref<{ id: number; text: string }>(null);
</script>