import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/navigation/navigation.component";
import Home from "./components/home/home.component";
import Auth from "./components/auth/auth.component";
import Details from "./components/details/detailsPage.component";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Redirect to="/portfolios" />}
          />
          <Route path="/portfolios" exact component={Home} />
          <Route path="/portfolios/search" exact component={Home} />
          <Route path="/portfolios/:id" component={Details} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/portfolios" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
export default App;
