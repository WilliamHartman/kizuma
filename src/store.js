import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
//import reducer from './redux/reducer1'
//import reducer2 from './redux/reducer2'



const reducers = combineReducers({
//   reducer1, 
//   reducer2
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));