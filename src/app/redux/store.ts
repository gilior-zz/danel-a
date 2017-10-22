import {createStore, applyMiddleware, compose, GenericStoreEnhancer} from 'redux'
import {IAppState} from './IAppState'
import {reducer} from "./reducer";

declare var window: any;
var ext: GenericStoreEnhancer = (window.devToolsExtension) ? window.devToolsExtension() : (f) => f;
export const store = createStore<IAppState>(reducer, compose(ext) as GenericStoreEnhancer);
