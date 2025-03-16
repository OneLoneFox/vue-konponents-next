<template>
	<ExampleColumn>
		<ExampleRow>
			<KonButton @click="start" :loading="isLoading" :loading-progress="progress">
				Filled (default)
			</KonButton>
			<KonButton
				@click="indetLoading = !indetLoading"
				:loading="indetLoading"
				type="tonal"
			>
				Tonal button
			</KonButton>
			<KonButton :loading="indetLoading" type="text">
				Text button
			</KonButton>
			<KonButton :loading="indetLoading" type="border">
				Border button
			</KonButton>
		</ExampleRow>
		<ExampleRow>
			<KonButton disabled>
				Filled (default)
			</KonButton>
			<KonButton disabled type="tonal">
				Tonal button
			</KonButton>
			<KonButton disabled type="text">
				Text button
			</KonButton>
			<KonButton disabled type="border">
				Border button
			</KonButton>
		</ExampleRow>
	</ExampleColumn>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useFakeLoading } from "../utils/composables";

const indetLoading = ref(false);
const { isLoading, progress, start } = useFakeLoading();

</script>