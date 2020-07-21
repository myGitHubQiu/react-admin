import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { constantRoutes } from "@conf/routes";

class PublicLayout extends Component {
  renderRoute = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      );
    });
  };

  render () {
    // 代码分割和懒加载 <Suspense>包裹要渲染的组件

    return (
      <Suspense fallback={<div>...loading</div>}>
        <Switch>
          {this.renderRoute(constantRoutes)}
        </Switch>
      </Suspense>
    )
  }
}

export default PublicLayout;
