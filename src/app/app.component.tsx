import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import { Theme } from '@theme/config.theme';
import { StoreService } from '@services/store.service';
import { client } from '@graphql/client';
import { PrivateRoute } from '@components/general/private-route/private-route.component';

import { ChartPage } from '@pages/chart.page';
import { DatasetPage } from '@pages/dataset.page';
import { LoginPage } from '@pages/login.page';
import { MainPage } from '@pages/main.page';

const App: React.FunctionComponent = () => (
  <ThemeProvider theme={Theme}>
    <CssBaseline />

    <StoreService.Container>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute exact path="/chart" component={ChartPage} />
            <PrivateRoute exact path="/chart/:id" component={ChartPage} />
            <PrivateRoute exact path="/dataset" component={DatasetPage} />
            <PrivateRoute exact path="/dataset/:id" component={DatasetPage} />

            <Route exact path="/login" component={LoginPage} />
            <Route exact component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </StoreService.Container>
  </ThemeProvider>
);
export { App };
