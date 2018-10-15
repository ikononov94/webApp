import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
// import thunkMiddleware from 'redux-thunk';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

// const store = createStore(
//   applyMiddleware(thunkMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

ReactDOM.render(
  // <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </Provider>
  document.getElementById('root'),
);
serviceWorker.unregister();
