import type { Recordable } from '@/types';

function flatToTree(
  flatArray: Recordable<any>[],
  parentId: string | number | null = null,
) {
  const tree = [];

  // 查找所有父节点为 parentId 的节点
  const children = flatArray.filter((item) => item.parentId === parentId);

  // 遍历子节点，递归构建树
  for (const child of children) {
    const node = { ...child }; // 复制节点属性
    // 递归获取子节点的子树
    node.children = flatToTree(flatArray, child.id);
    tree.push(node);
  }

  return tree;
}

export { flatToTree };
