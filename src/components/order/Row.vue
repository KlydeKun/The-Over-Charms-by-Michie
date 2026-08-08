<template>
    <div :class="[
        'flex justify-between',
        bold ? 'font-semibold pt-2 border-t border-foreground/10' : '',
    ]">
        <span :class="!bold && 'text-muted-foreground'">{{ label }}</span>
        <span class="font-mono">{{ value }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
    value: string;
    bold?: boolean;
}>();
</script>