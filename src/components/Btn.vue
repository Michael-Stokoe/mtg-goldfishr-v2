<template>
    <button :disabled="disabled" :class="classes">
        <div class="flex space-x-2">
            <span>{{ label }}</span>
            <slot name="append"></slot>
        </div>
    </button>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps } from "vue";

const props = defineProps({
    label: {
        type: String,
        default: 'Button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'md',
    },
    colour: {
        type: String,
        default: 'neutral',
    }
});

const classes = computed(() => {
    let classes = 'rounded-full font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
    classes += ' disabled:opacity-50 disabled:cursor-not-allowed';
    classes += ` bg-${props.colour}-600 hover:bg-${props.colour}-500 focus-visible:outline-${props.colour}-600`;

    switch (props.size) {
        case 'xs':
            classes += ' px-2.5 py-1 text-xs';
            break;
        case 'sm':
            classes += ' px-2.5 py-1 text-sm';
            break;
        case 'md':
            classes += ' px-3 py-1.5 text-sm';
            break;
        case 'lg':
            classes += ' px-3.5 py-2 text-sm';
            break;
        case 'xl':
            classes += ' px-4 py-2.5 text-sm';
            break;
    }

    return classes;
});
</script>