import type { RemarkPlugin } from '@astrojs/markdown-remark';

/**
 * Markdown images that point to a "-dark" twin (e.g. figure-vi-dark.svg) are replaced by a
 * light + dark pair. CSS (see CustomStyles.astro) shows one of them depending on the site
 * theme (html.dark), not on the operating system setting.
 */
const DARK_SRC = /-dark\.(svg|png)$/i;

type MdNode = { type: string; url?: string; children?: MdNode[]; data?: Record<string, unknown> } & Record<string, unknown>;

function transform(node: MdNode) {
  if (!node.children) return;
  const next: MdNode[] = [];
  for (const child of node.children) {
    if (child.type === 'image' && typeof child.url === 'string' && DARK_SRC.test(child.url)) {
      const light: MdNode = { ...child, url: child.url.replace(/-dark(\.(svg|png))$/i, '$1'), data: { hProperties: { className: ['img-light'] } } };
      const dark: MdNode = { ...child, data: { hProperties: { className: ['img-dark'] } } };
      next.push(light, dark);
    } else {
      transform(child);
      next.push(child);
    }
  }
  node.children = next;
}

export const darkImageRemarkPlugin: RemarkPlugin = () => (tree) => {
  transform(tree as unknown as MdNode);
};
