import Mock from 'mockjs';
import type { LoginParams } from '../src/api';

export default [
  // 登录接口
  {
    url: '/auth/login',
    method: 'post',
    response: ({ body }: { body: LoginParams }) => {
      const { username, password } = body;
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            accessToken: Mock.mock('@guid'),
          },
          message: '登录成功',
        };
      }
      return {
        code: 500,
        message: '用户名或密码错误',
      };
    },
  },
  // 获取用户信息
  {
    url: '/api/userinfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          id: 0,
          realName: 'Vben',
          roles: ['super'],
          username: 'vben',
        },
        message: '获取用户信息成功',
      };
    },
  },
  // 获取用户菜单
  {
    url: '/menu/all',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            component: 'BlankLayout',
            id: 1,
            meta: {
              title: 'page.dashboard.title',
            },
            name: 'dashboard',
            parentId: 0,
          },
          {
            id: 100001,
            meta: {
              title: 'page.dashboard.analytics',
            },
            name: 'analytics',
            parentId: 1,
          },
        ],
        message: '获取用户菜单成功',
      };
    },
  },
];
