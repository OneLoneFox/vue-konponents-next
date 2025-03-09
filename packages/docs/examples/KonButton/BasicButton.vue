<template>
	<!-- #region template -->
	<KonButton>Clicks: {{ count }}</KonButton>
	<!-- #endregion template -->
</template>

<script setup lang="ts">
//#region script
import { ref } from "vue";

const count = ref(1);
//#endregion script
</script>