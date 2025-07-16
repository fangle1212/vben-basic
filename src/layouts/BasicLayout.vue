<script lang="ts" setup>
import { usePreferences } from '@/preferences/index';

const { theme } = usePreferences();

console.log(theme);
</script>

<template>
  <div class="relative flex min-h-full w-full">
    <div :class="theme" class="h-full transition-all duration-150"></div>
    <a-side
      :class="theme"
      class="bg-sidebar border-border fixed top-0 left-0 h-full border-r transition-all duration-150"
    ></a-side>
    <div
      class="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in"
    >
      <RouterView />
    </div>
  </div>
</template>
