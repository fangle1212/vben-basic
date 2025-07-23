<script lang="ts" setup></script>

<template>
  <el-container class="h-screen">
    <el-header>Header</el-header>
    <el-container class="overflow-hidden">
      <el-aside width="200px">
        <i-ep-Edit />
      </el-aside>
      <el-container>
        <el-main><RouterView /></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
