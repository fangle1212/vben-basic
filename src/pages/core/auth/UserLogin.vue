<template>
  <div>
    <el-form ref="LoginFormRef" :model="formState" :rules="rules">
      <el-form-item label="Username" prop="username">
        <el-input v-model="formState.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="formState.password" />
      </el-form-item>
      <el-form-item prop="remember">
        <el-checkbox-group v-model="formState.remember">
          <el-checkbox :value="1" name="type"> Remember me </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(LoginFormRef)">
          {{ $t('common.login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useAuthStore } from '@/store';
import type { LoginParams } from '@/api';

const LoginFormRef = ref<FormInstance>();
const rules = reactive<FormRules<typeof formState>>({
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
});
const useAuth = useAuthStore();

interface FormState extends LoginParams {
  remember: number[];
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: [1],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      useAuth.authLogin(formState);
    }
  });
};
</script>

<style scoped lang="scss"></style>
