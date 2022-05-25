import { Frame } from "./components/containers/frame/frame.component";
import { registerWidgets } from "./lib/widget.map";

export const initialise = () => {
  registerWidgets({
    containerFrame: Frame,
  });
};
