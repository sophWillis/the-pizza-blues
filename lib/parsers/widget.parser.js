import { parseRichTextToMarkdown } from "./rich-text.parser";
import { WIDGET_MAP } from "../widget.map";

export const isRichTextDocument = (value) => {
  return value.nodeType && value.nodeType === "document" && value.content;
};

export const isEntryReference = (value) => {
  return value.sys && value.fields;
};

export const isEntryCollection = (value) => {
  return (
    Array.isArray(value) && value.every((entry) => isEntryReference(entry))
  );
};

export const parseEntryToWidget = (entry) => {
  const { sys, fields } = entry;

  const properties =
    fields &&
    Object.entries(fields)
      .map(([key, value]) => {
        if (isRichTextDocument(value)) {
          return [key, parseRichTextToMarkdown(value)];
        }
        if (isEntryReference(value)) {
          return [key, parseEntryToWidget(value)];
        }
        if (isEntryCollection(value)) {
          return [key, parseEntryCollectionToWidgetMap(value)];
        }

        return [key, value];
      })
      .reduce((obj, entry) => {
        obj[entry[0]] = entry[1];
        return obj;
      }, {});

  return {
    id: sys.id,
    _template: sys.contentType?.sys?.id || sys.type,
    ...properties,
  };
};

export const parseEntryCollectionToWidgetMap = (collection) => {
  const parsed = collection?.map((entry) => parseEntryToWidget(entry)) ?? null;

  return parsed;
};

export const renderWidgets = (widgets) => {
  return widgets?.map((widget) => {
    const Component = WIDGET_MAP[widget._template];

    if (Component) {
      const props = { ...widget };
      delete props._template;

      const children = (props.widgets && renderWidgets(props.widgets)) || null;
      delete props.widgets;

      return (
        <Component key={props.id} {...props}>
          {children}
        </Component>
      );
    }

    return null;
  });
};
