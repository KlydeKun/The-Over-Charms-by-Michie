<template>
  <footer class="px-5 sm:px-6 py-12 max-w-6xl mx-auto">
    <div class="grid gap-8 md:grid-cols-3">
      <div>
        <span class="font-display text-xl font-bold">The Oven Charms</span>
        <p class="mt-3 text-sm text-muted-foreground max-w-xs text-justify">
          At The Oven Charms by Michie, we craft fresh breads, pastries, and
          cakes with passion and quality ingredients.
        </p>
      </div>
      <div>
        <h4
          class="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3"
        >
          Visit
        </h4>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Ferrer Compound, Market Avenue, 233 M. Suarez, Pasig, Metro Manila
        </p>
      </div>
      <div>
        <h4
          class="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3"
        >
          Connect
        </h4>
        <div class="flex gap-4 text-sm font-medium">
          <a
            :href="instagramLink"
            target="_blank"
            class="underline decoration-foreground/20 underline-offset-4"
            >Instagram</a
          >
          <a
            :href="facebookLink"
            target="_blank"
            class="underline decoration-foreground/20 underline-offset-4"
            >Facebook</a
          >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-foreground/20 underline-offset-4"
          >
            Email
          </a>
        </div>
      </div>
    </div>
    <div
      class="mt-12 pt-6 border-t border-foreground/10 text-[10px] uppercase tracking-widest text-muted-foreground"
    >
      © 2026 The Oven Charms by Michie
    </div>
  </footer>
</template>

<script setup lang="ts">
const facebookLink =
  "https://www.facebook.com/people/The-Oven-Charms-by-Michie/61550980702278/";

const instagramLink = "https://www.instagram.com/theovencharmsbymichie";
</script>
