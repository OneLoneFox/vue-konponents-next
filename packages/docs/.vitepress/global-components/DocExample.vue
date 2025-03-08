<template>
	<div class="doc-example">
		Example {{ val }}
		<div class="controls">
			.
		</div>
		<div v-if="$slots.code" class="doc-code">
			<slot name="code" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const val = ref("Component");
</script>

<style>
.doc-example {
	background: var(--vp-code-block-bg);
	color: var(--vp-c-text-1);
	padding: 20px 16px;
	border-radius: 20px;
}
.doc-example .controls{
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>