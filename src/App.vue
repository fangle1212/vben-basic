<script setup lang="ts">
import { elementLocale } from '@/locales';
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
