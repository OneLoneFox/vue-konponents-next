<template>
	<KonButton>
		Icons
		<template #leading>
			<ArrowUpDown :size="16" />
		</template>
		<template #trailing>
			<Zap :size="16" />
		</template>
	</KonButton>
	<KonButton type="tonal">
		Icons
		<template #leading>
			<ArrowUpDown :size="16" />
		</template>
		<template #trailing>
			<Zap :size="16" />
		</template>
	</KonButton>
	<KonButton type="text">
		Icons
		<template #leading>
			<ArrowUpDown :size="16" />
		</template>
		<template #trailing>
			<Zap :size="16" />
		</template>
	</KonButton>
	<KonButton type="border">
		Icons
		<template #leading>
			<ArrowUpDown :size="16" />
		</template>
		<template #trailing>
			<Zap :size="16" />
		</template>
	</KonButton>
</template>

<script setup lang="ts">
import { ArrowUpDown, Zap } from "lucide-vue-next";

</script>