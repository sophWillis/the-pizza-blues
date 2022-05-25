import { Frame } from "./components/containers/frame/frame.component";
import { RichText } from "./components/widgets/rich-text/rich-text.component";
import { registerWidgets } from "./lib/widget.map";

export const initialise = () => {
  registerWidgets({
    containerFrame: Frame,
    widgetRichText: RichText,
  });
};
