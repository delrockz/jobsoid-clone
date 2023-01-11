import { IJobsByDepartment } from '../../../interfaces/IJobsByDepartment'
import { actions } from './constants'

export const getJobs = ({ q, loc, dept, fun }: { q: string; loc: string; dept: string; fun: string }) => {
  return {
    type: actions.GET_JOBS,
    payload: { q, loc, dept, fun }
  }
}

export const getJobsSuccess = (jobsByDepartment: IJobsByDepartment[]) => {
  return {
    type: actions.GET_JOBS_SUCCESS,
    payload: jobsByDepartment
  }
}

export const getJobById = (photoId: string) => {
  return {
    type: actions.GET_JOB_BY_ID,
    payload: photoId
  }
}

export const getJobByIdSuccess = (jobsByDepartent: IJobsByDepartment[]) => {
  return {
    type: actions.GET_JOB_BY_ID_SUCCESS,
    payload: jobsByDepartent
  }
}
