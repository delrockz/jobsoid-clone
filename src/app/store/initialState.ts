import { IJob } from '../../interfaces/IJob'
import { IJobsByDepartment } from '../../interfaces/IJobsByDepartment'

const initialState = {
  jobsByDepartment: [] as IJobsByDepartment[],
  jobDetails: {} as IJob
}

export default initialState
