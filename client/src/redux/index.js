import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import shareItemPreviewReducer from './shareItemPreview/reducer';

const middleware = [];

const store = createStore(
  combineReducers({ shareItemPreview: shareItemPreviewReducer }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
