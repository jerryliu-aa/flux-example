require('debug').enable('demo:*');
var debug = require('debug');
var React = require('react');
var ReactDOM = require('react-dom');

var {IntlProvider, addLocaleData} = require('react-intl');

var { Router, Route, IndexRoute, RouteHandler, Redirect, hashHistory } = require('react-router');

var Home = require('./views/home');
var intlData = require('./intl/load_intl');

import { Provider } from 'react-redux'
import { createStore } from 'redux'

function initIntl() {
  var ourIntlData = intlData.ours;

  addLocaleData(intlData.provided);
  addLocaleData({
    locale: BUILD_INTL_NAME,
    parentLocale: BUILD_INTL_PARENT_NAME
  });

  if ('ReactIntlLocaleData' in window) {
    Object.keys(ReactIntlLocaleData).forEach((lang) => {
      addLocaleData(ReactIntlLocaleData[lang]);
    });
  }

  return ourIntlData;
}

var ourIntlData = initIntl();

function initStore() {
  var model = require('./model/country-picker/');
  var store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(model.countryPicker, model.defaultState);

  return store;
}

var store = initStore();

var App = () => (
  <IntlProvider {...ourIntlData}>
    <div className='app'>
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  </IntlProvider>
);

var NoMatch = () => (<div>404</div>);

ReactDOM.render((
  <App/>
), document.querySelector('#container'));
