import { initialise } from "../bootstrap";

import "../styles/globals.css";
import "../styles/tokens.css";

initialise();

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
