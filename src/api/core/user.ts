import { GET } from '@/api/request';
import type { UserInfo, BasicResponse } from '@/types';

export const getUserInfoApi = () =>
  GET<BasicResponse<UserInfo>>('/api/userinfo');
