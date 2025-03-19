<script setup>
import IndeterminateProgress from "../../examples/KonProgressCircular/IndeterminateProgress.vue";
import WithValue from "../../examples/KonProgressCircular/WithValue.vue";
</script>

# Circular progress

A circular progress component that tries to imitate the material design 3 spec.

## Default

Set a value between 0-100.

<DocExample :test-focus="false">
<WithValue />
<template #code>

<<< @/../examples/KonProgressCircular/WithValue.vue

</template>
</DocExample>

## Determinate

Set indeterminate to true to use an indeterminate spinner.

<DocExample :test-focus="false">
<IndeterminateProgress />
<template #code>

<<< @/../examples/KonProgressCircular/IndeterminateProgress.vue

</template>
</DocExample>