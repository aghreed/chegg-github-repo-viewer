import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState } from "./storage";
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
    sagaMiddleware.run(sagas);
    return store;
};

export default configureStore();