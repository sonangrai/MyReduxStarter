import { Helmet } from "react-helmet";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Helmet>
        <title>React Starter</title>
      </Helmet>
      <h1>Welcome TO Redux Starter</h1>
    </Provider>
  );
}

export default App;
