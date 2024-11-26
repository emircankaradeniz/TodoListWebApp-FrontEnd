import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/GundelikGorevler";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import MainPage from "./pages/MainPage";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/Ana-Sayfa" component={Home} />
          <Route exact path="/Gündelik-İşler" component={Tables} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/" component={MainPage} />
        </Main>
      </Switch>
      
    </div>
    
  );
}

export default App;
