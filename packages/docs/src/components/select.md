<script setup lang="ts">
import BasicSelect from '../../examples/KonSelect/BasicSelect.vue';
import CollapseChips from '../../examples/KonSelect/CollapseChips.vue';
import FilterFunction from '../../examples/KonSelect/FilterFunction.vue';
import FilterItems from '../../examples/KonSelect/FilterItems.vue';
import MultiSelect from '../../examples/KonSelect/MultiSelect.vue';
import ObjectItems from '../../examples/KonSelect/ObjectItems.vue';
import SelectLoader from '../../examples/KonSelect/SelectLoader.vue';

</script>

# Select

Allows to select a single or multiple items from a list.

## Default

A default select component with placeholder, label and its disabled state.

<DocExample>
<template #code>

<<< @/../examples/KonSelect/BasicSelect.vue

</template>
<BasicSelect />
</DocExample>

## Multiple

Set `multiple` to true to allow multiple items to be selected.

<DocExample>
<template #code>

<<< @/../examples/KonSelect/MultiSelect.vue{7,15}

</template>
<MultiSelect />
</DocExample>

### Collapse chips

Set `collapse-chips` and `max-chips` to collapse all selected items into a single chip with the count of all extra items.

<DocExample>
<template #code>

<<< @/../examples/KonSelect/CollapseChips.vue{8,16-17}

</template>
<CollapseChips />
</DocExample>

## Object items

When an array of objects is provided as `items` you also ***must*** set `text-attribute` and `value-attribute` to tell the component which object keys to treat as the value to select and the text to display. When selecting an item or items the full selected object or array of objects is emitted as the `update:modelValue` event's payload.

<DocExample>
<template #code>

<<< @/../examples/KonSelect/ObjectItems.vue{7-8,15-16}

</template>
<ObjectItems />
</DocExample>

## Filter items

You can filter the items in the dropdown by setting `filter-items` to true and either providing the `search` prop or setting the `filter-input` prop to true. The former allows providing a search term from outside the select component while the latter enables an internal search value and shows an input instead of the placeholder (the `placeholder` will be shown as said input's placeholder).

::: tip
When using object items the `filter-attribute` or the `text-attribute` prop will be used to search the item, if you want to further customize the filter please check the [filter function](#filter-function) section below.
:::

<DocExample>
<template #code>

<<< @/../examples/KonSelect/FilterItems.vue{7-8,15-16,26-27}

</template>
<FilterItems />
</DocExample>

### Filter function

You can provide a custom filter callback to customize the way items are filtered in the list. This way you can, for example, use Fuse.js to enable fuzzy search.
Needless to say, the custom search function works with both the provided `search` prop and the internal search value when `filter-input` is true.

The filter callback must match the following signature:
```ts
type FilterFn = (items: T[], searchTerm: string) => T[];
```

<DocExample>
<template #code>

<<< @/../examples/KonSelect/FilterFunction.vue{9,21,32-39,41-47}

</template>
<FilterFunction />
</DocExample>

::: info
The default implementation of `filter-fn` uses the item's text value (either the raw value or the object's `filter-attribute` or `text-attribute`) in lowercase to find an exact match.
:::

## Loaders

### Default loader

Use the `loading`, `loading-progress` and `disable-on-loading` props to customize the default select loader.

<DocExample>
<template #code>

<<< @/../examples/KonSelect/SelectLoader.vue{9,16-17,24-26,38,48-49,59-61}

</template>
<SelectLoader />
</DocExample>