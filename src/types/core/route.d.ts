interface ActionItem {
  action: string;
  describe: string;
}

enum MenuType {
  MENU = '1',
  BUTTON = '2',
}

interface MenuMeta {
  hidden: 0 | 1;
  hideChildren: 0 | 1;
  icon: string;
  keepAlive: 0 | 1;
  title: string;
  [key: symbol]: any;
  [key: string]: any;
}

interface MenuItem {
  component: string;
  id: string;
  meta: MenuMeta;
  name: string;
  parentId: string;
  path: string;
  redirect: string;
  actions: ActionItem[];
}

export type { MenuItem, MenuMeta, MenuType };
