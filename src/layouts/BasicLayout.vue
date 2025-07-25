<script lang="ts" setup>
import { useSystemStore } from '@/store';
const systemStore = useSystemStore();

function change() {
  systemStore.setLang(systemStore.lang === 'en-US' ? 'zh-CN' : 'en-US');
}
</script>

<template>
  <el-container class="h-screen">
    <el-header>Header</el-header>
    <el-container class="overflow-hidden">
      <el-aside width="200px">
        <i-ep-Edit />
        {{ $t('common.login') }}
        <el-button @click="change">Change</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-pagination :total="100" />
      </el-aside>
      <el-container>
        <el-main><RouterView /></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
