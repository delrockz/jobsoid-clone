import { call, put } from 'redux-saga/effects'
import * as actions from '../actions'
import * as services from './requests'
import IAction from '../../../interfaces/IAction'
import { SagaIterator } from 'redux-saga'
import { useToast } from '@chakra-ui/react'
import { IJob } from '../../../interfaces/IJob'
import { IJobsByDepartment } from '../../../interfaces/IJobsByDepartment'

const handleError = (e: any) =>
  useToast({
    title: e?.response?.data?.error,
    status: 'error',
    isClosable: true
  })

export function* getJobsHandle(action: IAction): SagaIterator {
  try {
    const response = yield call(services.getJobsService, action.payload)
    const departmentJobs = response.data
      .filter((obj: IJob) => obj.department)
      .reduce(
        (acc: any, curr: IJob) => ({
          ...acc,
          [curr.department.title]: [...(acc[curr.department.title || ''] || []), curr]
        }),
        {}
      )
    const jobsByDepartment: IJobsByDepartment[] = Object.keys(departmentJobs || {})?.map((department: string) => ({
      department,
      jobs: departmentJobs[department]
    }))
    yield put(actions.getJobsSuccess(jobsByDepartment))
  } catch (e: any) {
    handleError(e)
  }
}

export function* getJobByIdHandle(action: IAction): SagaIterator {
  try {
    const response = yield call(services.getJobByIdService, action.payload)
    yield put(actions.getJobByIdSuccess(response.data))
  } catch (e: any) {
    handleError(e)
  }
}
