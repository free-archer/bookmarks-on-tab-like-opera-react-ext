import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './';

export const Routes = () => <Route exact path="/" component={Home} />;
