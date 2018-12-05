import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import store from './src/store/store';
import routes from './src/components/index';

ReactDOM.render(
  <div>
    <Provider store={store}>
      {routes}
    </Provider>
  </div>, document.querySelector('#app')
);
