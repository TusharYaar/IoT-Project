import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import { useAuth } from "./Context/MyContext";
const App = () => {
  const { currentUser } = useAuth();

  return (
    <Switch>
      <Route path="/" exact>
        {currentUser.uid ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
};

export default App;
