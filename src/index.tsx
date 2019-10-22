import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app.component';
import * as serviceWorker from './serviceWorker';
import 'index.css';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
