import { SagaIterator } from 'redux-saga'
import { takeLatest, all } from 'redux-saga/effects'
import { actions } from '../actions/constants'
import * as handlers from './handlers'

export function* watcherSaga(): SagaIterator {
  yield all([yield takeLatest(actions.GET_JOBS, handlers.getJobsHandle)])
  yield all([yield takeLatest(actions.GET_JOB_BY_ID, handlers.getJobByIdHandle)])
}
