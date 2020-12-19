import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { configureFakeBackend } from './jwt/_helpers';
configureFakeBackend(); // temporal para pruebas

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <App></App>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);
