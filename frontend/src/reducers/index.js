import { combineReducers } from 'redux'
import * as reducer from './reducerManifest'

export default combineReducers(Object.assign({}, reducer))