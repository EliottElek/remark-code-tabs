import { visit } from "unist-util-visit";

function renderTabs(tabs, nodes) {
  let tabNodes = [];

  tabNodes.push({
    type: "mdxJsxFlowElement",
    name: "Tabs",
    attributes: [],
    children: [],
  });

  tabs.forEach((tab) => {
    const node = nodes[tab.start];
    const label = node.meta;
    tabNodes[0].children.push({
      type: "mdxJsxFlowElement",
      name: "Tab",
      attributes: [{ type: "mdxJsxAttribute", name: "label", value: label }],
      children: [node],
    });
  });

  return tabNodes;
}
function findTabs(node, index, parent) {
  const tabs = [];
  let tab;
  index = index - 1;
  while (++index < parent.children.length) {
    parent.children[index].endTab = parent.children[index].lang.includes("end");
    parent.children[index].lang = parent.children[index].lang.split("-")[0];
    tab = {};
    tab.start = index;
    tab.end = parent.children.length;
    tabs.push(tab);
    if (parent.children[index].endTab) {
      tab.end = index + 1;
      break;
    }
  }

  return tabs;
}

export default function () {
  return function (tree) {
    visit(tree, (node, index, parent) => {
      if (node.type !== "code" || !node.meta) return;
      if (!node.lang.includes("tab")) return;
      const tabs = findTabs(node, index, parent);
      if (tabs.length > 0) {
        const start = tabs[0].start;
        const end = tabs[tabs.length - 1].end;
        const newChildren = renderTabs(tabs, parent.children);
        parent.children.splice(start, end - start, ...newChildren);
        return index + newChildren.length;
      }
    });
  };
}
