<template>
	<ExampleColumn>
		<ExampleRow>
			<KonButton @click="linear = true" :loading="linear">
				Linear progress
				<template #loader>
					<KonProgressLinear indeterminate />
				</template>
			</KonButton>
			<KonButton @click="linear = true" :loading="linear" type="tonal">
				Linear progress
				<template #loader>
					<KonProgressLinear indeterminate />
				</template>
			</KonButton>
			<KonButton @click="linear = true" :loading="linear" type="text">
				Linear progress
				<template #loader>
					<KonProgressLinear indeterminate />
				</template>
			</KonButton>
			<KonButton @click="linear = true" :loading="linear" type="border">
				Linear progress
				<template #loader>
					<KonProgressLinear indeterminate />
				</template>
			</KonButton>
		</ExampleRow>
		<ExampleRow>
			<KonButton
				@click="start"
				:loading="isLoading"
			>
				With value
				<template #loader>
					<KonProgressLinear :value="progress" />
				</template>
			</KonButton>
			<KonButton
				@click="start"
				:loading="isLoading"
				type="tonal"
			>
				With value
				<template #loader>
					<KonProgressLinear :value="progress" />
				</template>
			</KonButton>
			<KonButton
				@click="start"
				:loading="isLoading"
				type="text"
			>
				With value
				<template #loader>
					<KonProgressLinear :value="progress" />
				</template>
			</KonButton>
			<KonButton
				@click="start"
				:loading="isLoading"
				type="border"
			>
				With value
				<template #loader>
					<KonProgressLinear :value="progress" />
				</template>
			</KonButton>
		</ExampleRow>
		<ExampleRow>
			<KonButton 
				@click="customLoading = !customLoading"
				:disable-on-loading="false"
				:loading="customLoading"
			>
				Toggle custom
				<template #loader>
					<div class="fake-loader">
						Loading<span style="position: absolute;">{{ loadingEllipsis }}</span>
					</div>
				</template>
			</KonButton>
			<KonButton
				@click="customStart"
				:loading="customLoading2"
				type="tonal"
			>
				Custom Progress
				<template #loader>
					<div class="custom-progress" :style="{'--progress': customProgress / 100}">
						{{ customProgress.toFixed(0) }}%
					</div>
				</template>
			</KonButton>
		</ExampleRow>
	</ExampleColumn>
</template>

<script setup lang="ts">

import { onMounted, onUnmounted, ref, watch } from "vue";
import { useFakeLoading } from "../utils/composables";

const linear = ref(false);
const { isLoading, progress, start } = useFakeLoading();
const customLoading = ref(false);
const { isLoading: customLoading2, progress: customProgress, start: customStart } = useFakeLoading();
const loadingEllipsis = ref("...");
const interval = ref<number|null>(null);

watch(linear, () => {
	if(linear.value == false) return;
	setTimeout(() => {
		linear.value = false;
	}, 5000);
});

onMounted(() => {
	interval.value = window.setInterval(() => {
		if(loadingEllipsis.value.length > 2){
			loadingEllipsis.value = "";
		}else{
			loadingEllipsis.value = loadingEllipsis.value + ".";
		}
	}, 250);
});

onUnmounted(() => {
	if(interval.value){
		window.clearInterval(interval.value);
	}
});

</script>

<style scoped lang="scss">
.custom-progress{
	display: flex;
	align-items: center;
	justify-content: center;
	&::before{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: currentColor;
		opacity: 0.16;
		transform: scaleX(var(--progress, 0));
		transform-origin: top left;
		transition: transform 250ms ease;
	}
}
</style>