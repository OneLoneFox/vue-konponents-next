<template>
	<div class="doc-example">
		<div class="content">
			<slot />
		</div>
		<div class="code">
			<div class="controls">
				<button class="control">
					<Keyboard :size="16" />
				</button>
				<button class="control" :class="{expanded: expandedResults}" @click="toggleResults">
					<View :size="16" />
				</button>
				<button class="control" :class="{expanded: expandedCode}" @click="toggleCode">
					<Code2 :size="16" />
				</button>
			</div>
			<div v-if="$slots.code" class="snippets">
				<div class="results" v-if="resultSnippet && expandedResults">
					{{ resultSnippet }}
				</div>
				<div class="code" v-if="expandedCode">
					<slot name="code" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Code2, Keyboard, View } from "lucide-vue-next";
import { ref } from "vue";
const resultSnippet = ref<null|string>(null);
const expandedResults = ref(false);
const expandedCode = ref(false);

function toggleResults(){
	expandedResults.value = !expandedResults.value;
	expandedCode.value = false;
}

function toggleCode(){
	expandedCode.value = !expandedCode.value;
	expandedResults.value = false;
}
</script>

<style lang="scss">
.doc-example {
	position: relative;
	background: var(--vp-c-bg-soft);
	color: var(--vp-c-text-1);
	padding: 20px 16px;
	border-radius: 20px;
	.content{
		display: flex;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 16px;
	}
	.controls{
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		margin-top: 20px;
		.control{
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			color: rgba(var(--foreground-color), 0.6);
			background: transparent;
			border: none;
			padding: 4px 10px;
			border-radius: 8px 8px 0 0;
			transition: all 250ms ease;
			cursor: pointer;
			outline: none;
			border: 2px solid transparent;
			border-bottom-width: 0px;
			&.expanded:not(.results){
				color: #FFF;
				background: rgb(var(--dark-accent-color));
			}
			&.results::before{
				content: '';
				display: block;
				position: absolute;
				transition-property: background;
				transition-duration: 0;
				// transition-delay: 250ms;
				background: transparent;;
				width: 100%;
				height: 4px;
				bottom: -3px;
				z-index: 2;
			}
			&.expanded.results{
				&::before{
					background: rgb(var(--background-active-color));
				}
				border: 2px solid rgba(var(--background-color), 1);
				border-bottom-width: 0px;
			}
			&:hover, &:focus-visible{
				&:not(.expanded){
					color: rgba(var(--foreground-color), 1);
				}
			}
		}
	}
}
</style>