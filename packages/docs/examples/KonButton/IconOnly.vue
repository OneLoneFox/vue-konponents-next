<template>
	<KonButton icon>
		<Settings />
	</KonButton>
	<KonButton type="tonal" icon>
		<Maximize />
	</KonButton>
	<KonButton type="text" icon>
		<Edit />
	</KonButton>
	<KonButton type="border" icon>
		<SwatchBook />
	</KonButton>
</template>

<script setup lang="ts">
import { Edit, Maximize, Settings, SwatchBook } from "lucide-vue-next";

</script>