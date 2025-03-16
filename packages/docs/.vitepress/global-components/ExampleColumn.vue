<template>
	<div class="doc-column">
		<slot />
	</div>
</template>

<style lang="scss">
.doc-column {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>