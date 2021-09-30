import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useAuth } from "./Context/MyContext";
const App = () => {
  const { currentUser } = useAuth();

  return (
    <Switch>
      <Route path="/" exact>
        {currentUser.uid ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default App;
