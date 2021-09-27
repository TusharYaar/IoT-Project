import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";

function App() {
  return (
    <Switch>
      <Route path="/" exact />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;
