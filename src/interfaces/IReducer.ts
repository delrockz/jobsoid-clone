import { IJob } from './IJob'
import { IJobsByDepartment } from './IJobsByDepartment'

export interface IReducer {
  jobsByDepartment: IJobsByDepartment[]
  jobDetails: IJob
}
