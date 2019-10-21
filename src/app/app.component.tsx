import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import { Theme } from '@theme/config.theme';
import { PrivateRoute } from '@components/general/private-route/private-route.component';

import { ChartPage } from '@pages/chart.page';
import { DatasetPage } from '@pages/dataset.page';
import { LoginPage } from '@pages/login.page';
import { MainPage } from '@pages/main.page';

const App: React.FunctionComponent = () => (
  <ThemeProvider theme={Theme}>
    <CssBaseline />

    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" components={MainPage} />
        <PrivateRoute exact path="/chart" components={ChartPage} />
        <PrivateRoute exact path="/chart/:id" components={ChartPage} />
        <PrivateRoute exact path="/dataset" components={DatasetPage} />
        <PrivateRoute exact path="/dataset/:id" components={DatasetPage} />

        <Route exact path="/login" component={LoginPage} />
        <Route exact component={LoginPage} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);
export { App };
