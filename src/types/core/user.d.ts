/** 用户信息 */
interface UserInfo {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 用户昵称
   */
  realName: string;
  /**
   * 用户角色
   */
  roles?: string[];
  /**
   * 用户id
   */
  userId: string;
  /**
   * 用户名
   */
  username: string;
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
