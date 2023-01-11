import IAction from '../../interfaces/IAction'
import { IReducer } from '../../interfaces/IReducer'
import { actions } from './actions/constants'
import initialState from './initialState'

const rootReducer = (state: IReducer = initialState, action: IAction) => {
  switch (action.type) {
    case actions.GET_JOBS_SUCCESS:
      return { ...state, jobsByDepartment: action.payload }
    case actions.GET_JOB_BY_ID_SUCCESS:
      return { ...state, jobDetails: action.payload }
    default:
      return state
  }
}

export default rootReducer
