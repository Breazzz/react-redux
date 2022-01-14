import {all} from 'redux-saga/effects'
import { userWatcher } from "./userSaga";
import countWatcher from "./countSaga";

export function* rootWatcher() {
  yield all([countWatcher(), userWatcher()])
}