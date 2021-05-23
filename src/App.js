import React from "react";
import HandyAuth from "./common/HandyAuth";
import Loadable from "react-loadable";
import PageLoading from "./common/PageLoading";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import Container from "./common/Container";

const renderComponent = (AsyncFunc) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Link to="/" style={{ margin: "auto" }}>
        <img alt="logo" src="/images/logo_white.png" className="logo" />
      </Link>
      <Container AsyncFunc={AsyncFunc} />
    </Layout>
  );
};

const asyncDashboard = Loadable({
  loader: () => import("./components/Dashboard"),
  loading: PageLoading,
});

const asyncCard = Loadable({
  loader: () => import("./components/Details"),
  loading: PageLoading,
});


function App() {
  return (
    <HandyAuth>
      <Router>
        <Route exact path={"/"} render={() => renderComponent(asyncDashboard)} />
        <Route exact path={"/card/:id"} render={() => renderComponent(asyncCard)} />
      </Router>
    </HandyAuth>
  );
}

export default App;
