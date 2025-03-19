<template>
	<div
		class="kon-select"
		:class="{
			'kon-disabled': disabled,
			'kon-loading-disable': loading && disableOnLoading,
			'kon-open': isOpen,
			'kon-has-label': label,
			'kon-full-width': fullWidth,
			'kon-error': error
		}"
		:style="{'z-index': isOpen ? '999' : 'auto'}"
		@click="handleClick"
		@blur="handleBlur"
		ref="select-el"
		:tabindex="shouldDisable ? -1 : 0"
		:aria-disabled="shouldDisable ? 'true' : 'false'"
		role="combobox"
	>
		<input type="hidden" :name="props.name">
		<label
			class="kon-select-label"
			:class="{'kon-is-placeholder': labelAsPlaceholder, 'kon-elevated': isElevated}"
			v-if="label"
		>
			{{ label }}
		</label>
		<span
			class="kon-placeholder"
			:class="{'kon-hidden': props.filterItems && props.filterInput && isOpen}"
			key="kon-label-placeholder"
			v-if="!props.modelValue"
		>
			{{ placeholder || '&nbsp;' }}
		</span>
		<span
			class="kon-value"
			:class="{'kon-value-hidden': filterItems && filterInput && isOpen}"
			:key="`kon-label-${getItemValue(modelValue)}`"
			v-else
		>
			{{ getItemText(modelValue) }}
		</span>
		<input
			class="kon-filter-input"
			v-show="filterItems && filterInput && isOpen"
			type="text"
			:value="internalSearch"
			@input="internalSearch = ($event.target as HTMLInputElement).value"
			@keydown.stop="handleKeydown"
			@blur.stop="handleBlur"
			@change.stop=""
			ref="filter-input"
		>
		<div class="chevron">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</div>
		<Transition name="kon-show-options" @before-enter="handleOptionsListEnter" @after-leave="handleOptionsListLeave">
			<div class="kon-options" v-show="isOpen">
				<TransitionGroup name="kon-options-list" tag="div" class="kon-options-list">
					<template v-if="filteredItems.length">
						<KonOption
							v-for="item in filteredItems"
							:key="getItemValue(item) ?? undefined"
							:value="getItemValue(item)"
							:selected="getItemValue(modelValue) === getItemValue(item)"
							:disabled="disabledItem(item)"
							@click="selectItem($event, item)"
							ref="options"
							v-slot="{selected}"
						>
							<!-- 
                                @slot Current KonOption content
                                    @binding {string|object} item the current item
                                    @binding {boolean} selected determines if the current item is selected
                            -->
							<slot :item="item" :selected="selected">
								{{ getItemText(item) }}
							</slot>
						</KonOption>
					</template>
					<template v-else>
						<KonOption :key="-1" disabled>
							<!-- 
                                @slot Empty option message
                                    @binding {string} search the internal filter search value
                             -->
							<slot name="empty" :search="internalSearch || search">
								{{ (search == '' && internalSearch == '') ? 'No options' : 'No matching results' }}
							</slot>
						</KonOption>
					</template>
				</TransitionGroup>
			</div>
		</Transition>
		<Transition name="kon-toggle-message">
			<div class="kon-select-message" v-if="!!$slots.message">
				<!-- 
                    @slot Shows a message below the select
                 -->
				<slot name="message" />
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts" generic="T extends {[key: string]: any}">
import { computed, ref, useTemplateRef } from "vue";
import KonOption from "./KonOption.vue";

type Item = string|number|T;
type FilterFn = (items: Item[], searchTerm: string) => Item[];

/**
 * This has to be a type instead of an interface otherwise
 * the declaration file generation will fail for this file.
 * 
 * https://github.com/vuejs/language-tools/issues/1232#issuecomment-2535894665
 */
type Props = {
	/**
	 * The v-model value.
	 */
	modelValue: Item | null;
	/**
	 * Disables all interactions with the component.
	 */
	disabled?: boolean;
	/**
	 * Sets the component's state as loading.
	 */
	loading?: boolean;
	/**
	 * Disables the component when loading is true.
	 */
	disableOnLoading?: boolean;
	/**
	 * The current value of the default loader, between 0-100.
	 * 
	 * Leave as undefined to use an indeterminate loader.
	 */
	loadingProgress?: number;
	/**
	 * If set to true AND the `items` are an array of objects
	 * the entire object will be returned
	 */
	returnObject?: boolean;
	/**
	 * The name to pass to the native input element.
	 */
	name?: string;
	/**
	 * Defines the component's label.
	 */
	label?: string;
	/**
	 * Defines the component's placeholder
	 */
	placeholder?: string;
	/**
	 * If set to true the label will show in the position of the placeholder
	 * when the component is idle and move to the position
	 * of a label when active (opened).
	 */
	labelAsPlaceholder?: boolean;
	/**
	 * An array of items to display in the select's dropdown.
	 * 
	 * If an array of objects is passed the valueAttribute and textAttribute
	 * properties MUST be defined as valid object keys.
	 */
	items: Item[];
	/**
	 * Defines the object property to use as the label
	 * to show in the dropdown and the select item.
	 */
	textAttribute?: keyof T;
	/**
	 * Defines the object property to use as the value
	 * for the component to determine which item was selected.
	 * 
	 * It MUST be an unique value.
	 */
	valueAttribute?: keyof T;
	/**
	 * Set to true to make the component take the full width of its container.
	 */
	fullWidth?: boolean;
	/**
	 * A function to determine if an item should be disabled.
	 * 
	 * The function is executed for every item in `items`
	 * or, if filtered, only for every item visible.
	 * 
	 * @param item - The current element being evaluated, one of `items`.
	 */
	disabledItem?: (item: Item) => boolean;
	/**
	 * Enables the usage of a filter function to narrow down the
	 * visible items based on a `search` term or an internal search
	 * value if `filterInput` is true.
	 * 
	 * If false the `search` and `filterInput` props won't have any effect.
	 */
	filterItems?: boolean;
	/**
	 * Shows an input in the component to allow filtering
	 * without needing to provide the `search` prop.
	 */
	filterInput?: boolean;
	/**
	 * The search term used for filtering items without a `filterInput`.
	 */
	search?: string;
	/**
	 * Set to true to clear the internal search value when the options
	 * list is closed.
	 */
	clearSearchOnClose?: boolean;
	/**
	 * Determines the item attribute to be used by the default
	 * `filterFn` implementation.
	 * 
	 * If not provided `textAttribute` will be used.
	 */
	filterAttribute?: keyof T;
	/**
	 * 
	 * @param items - The `items` being filtered.
	 * @param searchTerm - The search term either from `search` or the internal one.
	 */
	filterFn?: FilterFn;
	/**
	 * Sets the component's status as error.
	 */
	error?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	disabledItem: () => false,
	disableOnLoading: true,
});
const emit = defineEmits<{
	(e: "update:modelValue", value: Item): void;
	(e: "click", ev: MouseEvent): void;
	(e: "blur", ev: FocusEvent): void;
	(e: "keydown", ev: KeyboardEvent): void;
	(e: "keypress", ev: KeyboardEvent): void;
}>();

const isOpen = ref(false);
const internalSearch = ref("");
const selectEl = useTemplateRef<HTMLElement>("select-el");
const filterInputEl = useTemplateRef<HTMLInputElement>("filter-input");

const isElevated = computed(() => {
	return props.modelValue !== null && props.modelValue !== undefined;
});

function defaultSearchFn(items: Item[], searchTerm: string){
	return items.filter((item) => {
		const searchTextLower = searchTerm.toLowerCase();
		if(typeof item == "string" || typeof item == "number"){
			const itemTextLower = item.toString().toLowerCase();
			return itemTextLower.includes(searchTextLower);
		}
		/**
			 * If no filterAttribute or textAttribute were set
			 * do nothing.
			 */
		if(!props.filterAttribute && !props.textAttribute){
			return item;
		}
			
		const attr = props.filterAttribute ? props.filterAttribute : props.textAttribute;
		/* At this point we know one of them is not undefined so it's safe to cast. */
		const itemText: unknown = item[attr as keyof T];
		if(typeof itemText == "string" || typeof itemText == "number"){
			/**
				 * Try to search if the attr given is string or number
				 * do nothing otherwise.
				 */
			const itemTextLower = itemText.toString().toLowerCase();
			return itemTextLower.includes(searchTextLower);
		}
		return item;
	});
}

const filteredItems = computed(() => {
	if(!props.filterItems){
		return props.items;
	}
	const itemsCopy = [...props.items];
	const searchTerm = props.search ? props.search : internalSearch.value;
	return props.filterFn ? props.filterFn(itemsCopy, searchTerm) : defaultSearchFn(itemsCopy, searchTerm);
});

const shouldDisable = computed(() => {
	return props.disabled || (props.loading && props.disableOnLoading);
});

function getItemValue(item: Item | null){
	if(item === null || item === "" || !props.valueAttribute){
		return null;
	}
	return typeof item === "object" ? item[props.valueAttribute] : item;
}

function getItemText(item: Item | null){
	if(item === null || item === "" || !props.textAttribute){
		return null;
	}
	return typeof item === "object" ? item[props.textAttribute] : item;
}

function open(){
	isOpen.value = true;
}

function close(){
	isOpen.value = false;
}

function toggle(){
	if(isOpen.value){
		close();
	}else{
		open();
	}
}

function handleClick(e: MouseEvent){
	toggle();
	emit("click", e);
}

function handleKeydown(e: KeyboardEvent){
	if(!isOpen.value) return;
	if(e.code == "Enter" || e.code == "Space"){
		return;
	}
	switch(e.code){
		case "ArrowUp":
			e.preventDefault();
			// focusPreviousOrLast();
			break;
		case "ArrowDown":
			e.preventDefault();
			// FocusNextOrFirst();
			break;
		case "Escape":
			close();
			break;
		default:
			if(isOpen.value && props.filterItems && props.filterInput){
				filterInputEl.value?.focus();
			}
	}
}

function selectItem(e: MouseEvent, item: Item){
	const val = getItemValue(item);
	const oldVal = getItemValue(props.modelValue);
	if(val !== oldVal){
		emit("update:modelValue", item);
	}
}

function handleBlur(e: FocusEvent){
	if(!selectEl.value?.contains(e.relatedTarget as HTMLElement)){
		close();
	}
}

function handleOptionsListEnter(el: Element){
	console.log(el);
}

function handleOptionsListLeave(el: Element){
	console.log(el);
}

</script>