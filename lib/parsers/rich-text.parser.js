import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export const parseRichTextToMarkdown = (document) => {
  return documentToHtmlString(document, {
    renderMark: {
      [MARKS.BOLD]: (text) => `**${text}**`,
      [MARKS.ITALIC]: (text) => `*${text}*`,
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (node, next) => `## ${next(node.content)}\n`,
      [BLOCKS.HEADING_3]: (node, next) => `### ${next(node.content)}\n`,
      [BLOCKS.HEADING_4]: (node, next) => `#### ${next(node.content)}\n`,
      [BLOCKS.HEADING_5]: (node, next) => `##### ${next(node.content)}\n`,
      [BLOCKS.HEADING_6]: (node, next) => `###### ${next(node.content)}\n`,
      [BLOCKS.PARAGRAPH]: (node, next) => {
        const content = next(node.content);
        const pattern = /<a.*?href="(.*?)".*?>(.*?)<\/a>/g;

        const toRender = content.replace(pattern, "[$2]($1)");

        return `${toRender}  \n`;
      },
      [BLOCKS.QUOTE]: (node, next) => `> ${next(node.content)}\n`,
      [BLOCKS.UL_LIST]: (node, next) => `${next(node.content)}\n`,
      [BLOCKS.LIST_ITEM]: (node, next) => `- ${next(node.content)}\n`,
      [BLOCKS.OL_LIST]: (node, next) => `${next(node.content)}\n`,
    },
  }).replace(/^\n/, "");
};
