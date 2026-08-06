<template>
  <section class="px-5 sm:px-6 max-w-6xl mx-auto mt-20">
    <div class="grid md:grid-cols-3 gap-4">
      <figure
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        class="bg-card border border-foreground/5 rounded-2xl p-6 flex flex-col justify-between"
      >
        <blockquote
          class="font-display italic text-lg leading-snug text-pretty"
        >
          {{ testimonial.message }}
        </blockquote>
        <figcaption
          class="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground"
        >
          — {{ testimonial.name }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { testimonials } from "@/lib/testimonials";
</script>
