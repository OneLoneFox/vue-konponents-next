<script setup>
import IndeterminateProgress from "../../examples/KonProgressLinear/IndeterminateProgress.vue";
import WithValue from "../../examples/KonProgressLinear/WithValue.vue";
</script>

# Linear progress

A Linear progress component that tries to imitate the material design 3 spec.

## Default

Set a value between 0-100.

<DocExample>
<WithValue />
<template #code>

<<< @/../examples/KonProgressLinear/WithValue.vue

</template>
</DocExample>

## Determinate

Set indeterminate to true to use an indeterminate spinner.

<DocExample>
<IndeterminateProgress />
<template #code>

<<< @/../examples/KonProgressLinear/IndeterminateProgress.vue

</template>
</DocExample>