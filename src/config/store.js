import { createStore, applyMiddleware } from "redux";
import { throttle } from "lodash";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState, saveState } from "./storage";
import reducer, { initialState } from "./reducer";
import sagas from "./sagas";

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const enhancers = composeWithDevTools(
        applyMiddleware(...middleware)
    );

    const persistedState = loadState();
    const state = persistedState === null ? initialState : persistedState; 

    const store = createStore(reducer, state, enhancers);

    store.subscribe(throttle(() => {
        saveState(store.getState());
      }, 500));

    sagaMiddleware.run(sagas);
    
    return store;
};

export default configureStore();