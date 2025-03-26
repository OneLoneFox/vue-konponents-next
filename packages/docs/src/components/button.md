
<script setup>
import BasicButton from "../../examples/KonButton/BasicButton.vue";
import ButtonLoader from "../../examples/KonButton/ButtonLoader.vue";
import CustomLoader from "../../examples/KonButton/CustomLoader.vue";
import IconOnly from "../../examples/KonButton/IconOnly.vue";
import IconSlots from "../../examples/KonButton/IconSlots.vue";
</script>

# Button

A button component that loosely follows material design 3.

## Default

The default button variants with their respective disabled state.

<DocExample>
<BasicButton />
<template #code>

<<< @/../examples/KonButton/BasicButton.vue

</template>
</DocExample>

## Slots

The button component exposes a `leading` and a `trailing` slot which are most commonly used, but not limited to, icons. As well as a [loader](#custom-loader) slot.

<DocExample>
<template #code>

<<< @/../examples/KonButton/IconSlots.vue

</template>
<IconSlots />
</DocExample>


## Icon mode

Setting the `icon` property to true simply makes the button have equal padding, useful for icon only buttons but doesn't limit content otherwise.

<DocExample>
<template #code>

<<< @/../examples/KonButton/IconOnly.vue

</template>
<IconOnly />
</DocExample>

## Loaders

### Default loader

Use the `loading`, `loading-progress` and `disable-on-loading` props to customize the default button loader.

<DocExample>
<ButtonLoader />
<template #code>

<<< @/../examples/KonButton/ButtonLoader.vue

</template>
</DocExample>

### Custom loader

Use the`loader` slot to provide your own custom loader which displays when `loading` is true. In this case the `loading-progress` prop IS NOT available as you should provide the progress directly to your custom loader.

<DocExample>
<template #code>

<<< @/../examples/KonButton/CustomLoader.vue

</template>
<CustomLoader />
</DocExample>