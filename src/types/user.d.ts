import type { BasicUserInfo } from '@/types';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 用户描述
   */
  desc: string;
  /**
   * accessToken
   */
  token: string;

  [key: string]: any;
}

export type { UserInfo };
