<template>
	<div
		class="kon-select"
		:class="{
			'kon-disabled': disabled,
			'kon-loading': loading,
			'kon-loading-disable': loading && disableOnLoading,
			'kon-open': isOpen,
			'kon-has-label': label,
			'kon-full-width': fullWidth,
			'kon-multiple': multiple,
			'kon-error': error,
			'kon-popover': popover,
		}"
		:style="{'z-index': zIndex}"
		@click="handleClick"
		@keydown="handleKeydown"
		@blur="handleBlur"
		ref="select-el"
		:tabindex="shouldDisable ? -1 : 0"
		:aria-expanded="isOpen ? 'true' : 'false'"
		:aria-disabled="shouldDisable ? 'true' : 'false'"
		:aria-labelledby="label ? `kon-select-label-${id}` : undefined"
		:aria-label="label ? undefined : `select ${id}`"
		:aria-controls="`select-${id}-listbox`"
		role="combobox"
	>
		<select
			class="kon-multiple-fallback"
			multiple
			tabindex="-1"
			v-if="multiple"
			aria-hidden="true"
			:name="name"
		>
			<option
				v-for="selected in (modelValue as T[])"
				:key="String(getItemValue(selected))"
				:value="getItemValue(selected)"
				selected
			/>
		</select>
		<input
			v-else
			type="hidden"
			:name="name"
			:value="selectedValue"
		>
		<label
			:id="`kon-select-label-${id}`"
			class="kon-select-label"
			:class="{'kon-is-placeholder': labelAsPlaceholder, 'kon-elevated': isElevated}"
			v-if="label"
		>
			{{ label }}
		</label>
		<span
			class="kon-placeholder"
			:class="{'kon-hidden': filterItems && filterInput}"
			key="kon-label-placeholder"
			v-if="multiple ? !(modelValue as T[]).length : !(modelValue as T)"
		>
			{{ placeholder || '&nbsp;' }}
		</span>
		<template v-else-if="!multiple">
			<span
				class="kon-value"
				:class="{'kon-hidden': filterItems && filterInput && isOpen}"
				:key="`kon-label-${selectedValue}`"
			>
				{{ getItemText(modelValue as T) }}
			</span>
		</template>
		<input
			v-if="!multiple"
			class="kon-filter-input"
			v-show="filterItems && filterInput"
			type="text"
			:placeholder="placeholder"
			:value="internalSearch"
			@input="internalSearch = ($event.target as HTMLInputElement).value"
			@keydown.stop="handleKeydown"
			@blur.stop="handleBlur"
			@change.stop=""
			ref="filter-input"
		>
		<template v-if="multiple">
			<TransitionGroup
				name="kon-select-multiple-chips"
				tag="div"
				class="kon-values"
				@before-leave="handleBeforeChipLeave"
			>
				<template v-if="visibleChips.length == 0 && !(filterItems && filterInput)">
					&nbsp;
				</template>
				<div
					class="kon-value-chip"
					v-for="item in visibleChips"
					:key="String(getItemValue(item))"
				>
					<span class="kon-value-text">{{ getItemText(item) }}</span>
					<span class="kon-chip-remove" @click.stop="handleRemoveClick(item)" />
				</div>
				<div
					class="kon-value-chip"
					key="kon-collapsed-chips"
					v-if="collapseChips && collapsedItemsCount > 0"
				>
					<span class="kon-value-text">{{ `+${collapsedItemsCount}` }}</span>
				</div>
				<input
					class="kon-filter-input"
					v-if="filterItems && filterInput"
					type="text"
					key="kon-filter"
					:placeholder="placeholder"
					:value="internalSearch"
					@input="internalSearch = ($event.target as HTMLInputElement).value"
					@keydown.stop="handleKeydown"
					@blur.stop="handleBlur"
					@change.stop=""
					ref="filter-input"
				>
			</TransitionGroup>
		</template>
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
		<KonProgressTransition>
			<span class="kon-select-loader" v-if="loading">
				<template v-if="$slots.loader">
					<!-- Slot used for custom select loader -->
					<slot name="loader" />
				</template>
				<template v-else>
					<KonProgressCircular
						:size="16"
						:indeterminate="loadingProgress == undefined"
						:value="loadingProgress"
					/>
				</template>
			</span>
		</KonProgressTransition>
		<Teleport :to="popoverTarget ?? 'body'" :disabled="!popover">
			<Transition name="kon-show-options" @before-enter="handleBeforeDropdownEnter" @after-leave="handleAfterDropdownLeave">
				<div
					:class="{'kon-open': isOpen, 'kon-popover': popover}"
					class="kon-options"
					:style="popover ? popoverStyles : undefined"
					v-show="isOpen"
					ref="dropdown-el"
					@keydown.stop="handleKeydown"
				>
					<TransitionGroup
						name="kon-options-list"
						tag="div"
						:id="`select-${id}-listbox`"
						class="kon-options-list"
						role="listbox"
						tabindex="-1"
						ref="options-list-el"
					>
						<template v-if="filteredItems.length">
							<KonOption
								:id="`kon-option-${id}-${getItemValue(item)}`"
								v-for="item in filteredItems"
								:key="String(getItemValue(item)) ?? undefined"
								:value="getItemValue(item)"
								:selected="isItemSelected(item)"
								:disabled="disabledItem(item)"
								@click.stop="handleItemClick(item)"
								ref="options"
								v-slot="{selected}"
							>
								<!-- 
									Slot for each option in the options list
									
									@prop {numer|string|object} item - The current item, one of `items`
									@prop {boolean} selected - Wether the current option is selected or not
								-->
								<slot :item="item" :selected="selected">
									{{ getItemText(item) }}
								</slot>
							</KonOption>
						</template>
						<template v-else>
							<KonOption :key="-1" disabled>
								<!-- 
									Slot for the empty option's content
									
									@prop {string} search - The current search value, either the internal search or the one provided via props
								 -->
								<slot name="empty" :search="filterInput ? internalSearch : search">
									{{ (search == '' && internalSearch == '') ? 'No options' : 'No matching results' }}
								</slot>
							</KonOption>
						</template>
					</TransitionGroup>
				</div>
			</Transition>
		</Teleport>
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

<script
	setup lang="ts"
	generic="T, K extends keyof T, M extends boolean | undefined"
>
import { computed, nextTick, onMounted, onUnmounted, provide, ref, shallowRef, useId, useTemplateRef, watch, watchEffect } from "vue";
import KonOption from "./KonOption.vue";
import KonProgressTransition from "../KonProgress/KonProgressTransition.vue";

type ModelType = undefined | false extends M ? T : T[];
type FilterFn = (items: T[], searchTerm: string) => T[];

/**
 * This has to be a type instead of an interface otherwise
 * the declaration file generation will fail for this file.
 * 
 * https://github.com/vuejs/language-tools/issues/1232#issuecomment-2535894665
 * 
 * Also, whenever you see an explicit type cast to T or T[]
 * that's due to a limitation as of writing where TS is unable to narrow
 * down generics and thus is unable to narrow down conditional generics
 * but when multiple is true TS only accepts T[] and we know that
 * but the engine is still unable to properly narrow it down.
 * 
 * Related issue: https://github.com/microsoft/TypeScript/issues/33912
 * 
 * Generics also break runtime boolean inference aka setting a boolean
 * prop with just my-bool instead of :my-bool="true"
 * 
 * Tracked in: https://github.com/vuejs/core/issues/12872
 */
type Props = {
	/**
	 * The v-model value.
	 */
	modelValue: ModelType | null;
	/**
	 * Determines if the component is a multi select.
	 * 
	 * If true `modelValue` will accept an array of selected items and
	 * `update:modelValue` will also emit an array with the selected items.
	 */
	multiple?: M;
	/**
	 * When true all selected values after the max amount defined in `maxChips`
	 * will be collapsed into a single chip with the extra items' count.
	 */
	collapseChips?: boolean;
	/**
	 * The maximum amount of chips to display before collapsing them.
	 */
	maxChips?: number;
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
	items: T[];
	/**
	 * Defines the object property to use as the label
	 * to show in the dropdown and the select item.
	 */
	textAttribute?: K;
	/**
	 * Defines the object property to use as the value
	 * for the component to determine which item was selected.
	 * 
	 * It MUST be an unique value.
	 */
	valueAttribute?: K;
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
	disabledItem?: (item: T) => boolean;
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
	filterAttribute?: K;
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
	/**
	 * When true the options dropdown will be rendered outside the select element
	 * as an absolutely positioned element.
	 */
	popover?: boolean;
	/**
	 * CSS selector for the target element to place the
	 * popover dropdown into.
	 */
	popoverTarget?: string;
};

const props = withDefaults(defineProps<Props>(), {
	disabledItem: () => false,
	disableOnLoading: true,
	maxChips: 1,
});
const emit = defineEmits<{
	(e: "update:modelValue", value: T | T[]): void;
	(e: "update:searchTerm", value: string): void;
	(e: "click", ev: MouseEvent): void;
	(e: "blur", ev: FocusEvent): void;
	(e: "keydown", ev: KeyboardEvent): void;
	(e: "keypress", ev: KeyboardEvent): void;
}>();

const id = useId();
const isOpen = ref(false);
const internalSearch = ref("");
const zIndex = ref<number | "auto">("auto");
const popoverPosition = shallowRef({ x: 0, y: 0, width: 0 });
const selectEl = useTemplateRef("select-el");
const filterInputEl = useTemplateRef("filter-input");
const dropdownEl = useTemplateRef("dropdown-el");
const optionsListEl = useTemplateRef("options-list-el");
const optionsRefs = useTemplateRef("options");

const selectedValue = computed(() => {
	if(props.multiple){
		return null;
	}
	return getItemValue(props.modelValue as T);
});

const isElevated = computed(() => {
	return props.modelValue !== null && props.modelValue !== undefined;
});

const visibleChips = computed(() => {
	if(!props.multiple) return [];
	if(!props.collapseChips){
		return props.modelValue as T[];
	}
	return (props.modelValue as T[]).slice(0, props.maxChips);
});

const collapsedItemsCount = computed(() => {
	if(!props.multiple) return 0;
	return (props.modelValue as T[]).length - props.maxChips;
});

const popoverStyles = computed(() => {
	return {
		"--dx": `${popoverPosition.value.x}px`,
		"--dy": `${popoverPosition.value.y}px`,
		"--width": `${popoverPosition.value.width}px`,
	};
});

watchEffect(() => {
	if(props.popover){
		window.addEventListener("resize", updatePopoverDropdown);
	}else{
		window.removeEventListener("resize", updatePopoverDropdown);
	}
});

onMounted(() => {
	/**
	 * Defer to next animation frame to account for
	 * potential load CLS
	 */
	requestAnimationFrame(() => {
		if(!selectEl.value || !props.popover) return;
		setPopoverDropdownPosition(selectEl.value);
	});
});

onUnmounted(() => {
	window.removeEventListener("resize", updatePopoverDropdown);
});

function defaultSearchFn(items: T[], searchTerm: string){
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
			return true;
		}
		const attr = props.filterAttribute ? props.filterAttribute : props.textAttribute;
		/* At this point we know one of them is not undefined so it's safe to cast. */
		const itemText: unknown = item[attr as K];
		if(typeof itemText == "string" || typeof itemText == "number"){
			/**
			 * Try to search if the attr given is string or number
			 * do nothing otherwise.
			 */
			const itemTextLower = itemText.toString().toLowerCase();
			return itemTextLower.includes(searchTextLower);
		}
		return true;
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

function getItemValue(item: T | null): T | T[K] | null{
	if(item === null || item === ""){
		return null;
	}
	if(typeof item === "object"){
		if(!props.valueAttribute) return null;
		return item[props.valueAttribute];
	}
	return item;
}

function getItemText(item: T | null): T | T[K] | null{
	if(item === null || item === ""){
		return null;
	}
	if(typeof item === "object"){
		if(!props.textAttribute) return null;
		return item[props.textAttribute];
	}
	return item;
}

function selectItem(item: T){
	if(props.multiple){
		const selectedItems = [...props.modelValue as T[]];
		selectedItems.push(item);
		emit("update:modelValue", selectedItems);
	}else{
		const val = getItemValue(item);
		const oldVal = selectedValue.value;
		if(val !== oldVal){
			emit("update:modelValue", item);
		}
		selectEl.value?.focus();
	}
}

function deselectItem(item: T){
	if(!props.multiple) return;
	let selected = [...props.modelValue as T[]];
	selected = selected.filter((selectedItem) => {
		return getItemValue(selectedItem) !== getItemValue(item);
	});
	emit("update:modelValue", selected);
}

function open(){
	isOpen.value = true;
}

function close(){
	isOpen.value = false;
	if(props.filterItems && props.clearSearchOnClose && filterInputEl.value){
		if(props.filterInput){
			internalSearch.value = "";
		}else{
			emit("update:searchTerm", "");
		}
	}
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

/**
 * Handles toggling of items when props.multiple is true
 * and simply selecting the item otherwise.
 */
function handleItemClick(item: T){
	if(props.multiple){
		if(isItemSelected(item)){
			deselectItem(item);
		}else{
			selectItem(item);
		}
	}else{
		selectItem(item);
		close();
	}
}

function handleRemoveClick(item: T){
	deselectItem(item);
}

function handleKeydown(e: KeyboardEvent){
	switch(e.code){
		case "Enter":
		case "Space":
			if(e.target == selectEl.value && !e.repeat){
				toggle();
			}
			return;
		case "ArrowUp":
			e.preventDefault();
			open();
			nextTick(() => {
				focusPreviousOption();
			});
			break;
		case "ArrowDown":
			e.preventDefault();
			open();
			nextTick(() => {
				focusNextOption();
			});
			break;
		case "Escape":
			e.preventDefault();
			close();
			selectEl.value?.focus();
			break;
		default:
			if(isOpen.value && props.filterItems && props.filterInput){
				filterInputEl.value?.focus();
			}
	}
}

function isItemSelected(item: T){
	if(props.multiple){
		return (props.modelValue as T[]).some((selectedItem) => {
			return getItemValue(selectedItem) === getItemValue(item);
		});
	}
	return selectedValue.value === getItemValue(item);
}

function handleBlur(e: FocusEvent){
	if(
		selectEl.value?.contains(e.relatedTarget as HTMLElement) 
		|| dropdownEl.value?.contains(e.relatedTarget as HTMLElement)
	){
		return;
	}
	close();
}

function setPopoverDropdownPosition(el: HTMLElement){
	const { x, y, width, height } = el.getBoundingClientRect();
	popoverPosition.value = { x, y: y + height, width };
}

function updatePopoverDropdown(){
	if(!selectEl.value || !isOpen.value) return;
	setPopoverDropdownPosition(selectEl.value);
}

function handleBeforeDropdownEnter(){
	if(props.popover){
		updatePopoverDropdown();
	}else{
		zIndex.value = 999;
	}
}

function handleAfterDropdownLeave(){
	if(!props.popover){
		zIndex.value = "auto";
	}
}

watch(filteredItems, () => {
	if(!isOpen.value) return;
	const el = optionsListEl.value?.$el as HTMLElement;
	// Set initial explicit height
	el.style.setProperty("height", `${el.clientHeight}px`);
	/**
	 * On next animation frame, after the transition
	 * group has taken over and we can get the new height
	 * with filtered items.
	 */
	requestAnimationFrame(() => {
		// Get initial height
		const from = el.clientHeight;
		// Set height to auto and get the new height
		el.style.setProperty("height", "auto");
		const to = el.clientHeight;

		el.style.setProperty("height", `${from}px`);
		/* Force repaint */
		void el.clientHeight;
		el.style.setProperty("height", `${to}px`);
	});
});

function getPreviousFocusableOption(current: Element): Element | null{
	let currentEl: Element | null = current;
	while(currentEl?.previousElementSibling) {
		currentEl = currentEl.previousElementSibling;
		if(!currentEl?.matches(":disabled")){
			return currentEl;
		}
	}
	return null;
}

function getNextFocusableOption(current: Element): Element | null{
	let currentEl: Element | null = current;
	while(currentEl?.nextElementSibling){
		currentEl = currentEl.nextElementSibling;
		if(!currentEl?.matches(":disabled")){
			return currentEl;
		}
	}
	return null;
}

/**
 * Wether the current DOM focus is a KonOption
 */
function isCurrentFocusOption(parent: HTMLElement){
	if(!document.activeElement){
		return false;
	}
	if(!parent.contains(document.activeElement)){
		return false;
	}
	if(!document.activeElement.classList.contains("kon-option")){
		return false;
	}
	return true;
}

function getCurrentlySelectedOption(): Element | null{
	if(!props.modelValue || props.multiple || !optionsRefs.value){
		return null;
	}
	const found = optionsRefs.value.find((optionRef) => {
		return getItemValue(optionRef?.props.value as T) === getItemValue(props.modelValue as T);
	});
	if(!found){
		return null;
	}
	return found.$el;
}

/**
 * If the current selected option is available focuses and returns
 * the Element. If not, attempts to focus the last option
 * if not disabled and returns null.
 */
function focusLastOrSelectedOption(){
	const selectedOption = getCurrentlySelectedOption();
	if(selectedOption){
		(selectedOption as HTMLElement).focus();
		return selectedOption;
	}
	const lastOption = optionsRefs.value?.at(-1)?.$el as HTMLElement | undefined;
	if(lastOption?.matches(":disabled")){
		return null;
	}
	lastOption?.focus();
	return null;
}

function focusPreviousOption(){
	if(!optionsRefs.value?.length || !dropdownEl.value) return;
	let current: Element | null = null;
	if(isCurrentFocusOption(dropdownEl.value)){
		current = document.activeElement;
	}else{
		current = focusLastOrSelectedOption();
	}
	if(!current) return;
	const focusable = getPreviousFocusableOption(current);
	if(!focusable) return;
	(focusable as HTMLElement).focus();
}

/**
 * If the current selected option is available focuses and returns
 * the Element. If not, attempts to focus the first option
 * if not disabled and returns null.
 */
function focusFirstOrSelectedOption(){
	const selectedOption = getCurrentlySelectedOption();
	if(selectedOption){
		(selectedOption as HTMLElement).focus();
		return selectedOption;
	}
	const firstOption = optionsRefs.value?.[0]?.$el as HTMLElement | undefined;
	if(firstOption?.matches(":disabled")){
		return null;
	}
	firstOption?.focus();
	return null;
}

function focusNextOption(){
	if(!optionsRefs.value?.length || !dropdownEl.value) return;
	let current: Element | null = null;
	if(isCurrentFocusOption(dropdownEl.value)){
		current = document.activeElement;
	}else{
		current = focusFirstOrSelectedOption();
	}
	if(!current) return;
	const focusable = getNextFocusableOption(current);
	if(!focusable) return;
	(focusable as HTMLElement).focus();
}

/**
 * This function forces the leaving chip to stay in its place since
 * it becomes a position absolute element when leaving but that also
 * forces it to leave the flex flow and position itself at the 0,0.
 * 
 */
function handleBeforeChipLeave(el: Element){
	const chip = el as HTMLElement;
	const { marginLeft, marginTop, width, height } = window.getComputedStyle(chip);
	chip.style.left = `${chip.offsetLeft - parseFloat(marginLeft)}px`;
	chip.style.top = `${chip.offsetTop - parseFloat(marginTop)}px`;
	chip.style.width = width;
	chip.style.height = height;
}

provide("selectRef", selectEl);
provide("dropdownRef", dropdownEl);
provide("close", close);

</script>