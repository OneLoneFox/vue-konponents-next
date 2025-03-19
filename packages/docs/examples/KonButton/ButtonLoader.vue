<template>
	<ExampleColumn>
		<ExampleRow>
			<KonButton @click="indetLoading = true" :loading="indetLoading">
				Indeterminate
			</KonButton>
			<KonButton @click="indetLoading = true" :loading="indetLoading" type="tonal">
				Indeterminate
			</KonButton>
			<KonButton @click="indetLoading = true" :loading="indetLoading" type="text">
				Indeterminate
			</KonButton>
			<KonButton @click="indetLoading = true" :loading="indetLoading" type="border">
				Indeterminate
			</KonButton>
		</ExampleRow>
		<ExampleRow>
			<KonButton
				@click="start"
				:loading="isLoading"
				:loading-progress="progress"
			>
				With value
			</KonButton>
			<KonButton
				@click="start"
				:loading="isLoading"
				:loading-progress="progress"
				type="tonal"
			>
				With value
			</KonButton>
			<KonButton
				@click="start"
				:loading="isLoading"
				:loading-progress="progress"
				type="text"
			>
				With value
			</KonButton>
			<KonButton
				@click="start"
				:loading="isLoading"
				:loading-progress="progress"
				type="border"
			>
				With value
			</KonButton>
		</ExampleRow>
		<ExampleRow>
			<KonButton 
				@click="toggleLoading = !toggleLoading"
				:disable-on-loading="false"
				:loading="toggleLoading"
			>
				Toggle loading
			</KonButton>
			<KonButton
				@click="toggleLoading = !toggleLoading"
				:disable-on-loading="false"
				:loading="toggleLoading"
				type="tonal"
			>
				Toggle loading
			</KonButton>
			<KonButton
				@click="toggleLoading = !toggleLoading"
				:disable-on-loading="false"
				:loading="toggleLoading"
				type="text"
			>
				Toggle loading
			</KonButton>
			<KonButton
				@click="toggleLoading = !toggleLoading"
				:disable-on-loading="false"
				:loading="toggleLoading"
				type="border"
			>
				Toggle loading
			</KonButton>
		</ExampleRow>
	</ExampleColumn>
</template>

<script setup lang="ts">

import { ref, watch } from "vue";
import { useFakeLoading } from "../utils/composables";

const indetLoading = ref(false);
const { isLoading, progress, start } = useFakeLoading();
const toggleLoading = ref(false);

watch(indetLoading, () => {
	if(indetLoading.value == false) return;
	setTimeout(() => {
		indetLoading.value = false;
	}, 5000);
});

</script>