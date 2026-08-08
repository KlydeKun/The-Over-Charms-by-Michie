<template>
    <div>
        <div class="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
            {{ label }}
        </div>
        <div :class="mono ? 'font-mono text-sm' : 'text-sm'">
            {{ value }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string | undefined;
    value: string | undefined;
    mono?: boolean;
}>();
</script>