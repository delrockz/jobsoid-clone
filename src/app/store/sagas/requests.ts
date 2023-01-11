import axios from 'axios'
import { links } from '../../statics/links'

export const getJobsService = ({ q, loc, dept, fun }: { q: string; loc: string; dept: string; fun: string }) => {
  let filters = {}
  if (q) filters = { ...filters, q }
  if (loc) filters = { ...filters, loc }
  if (dept) filters = { ...filters, dept }
  if (fun) filters = { ...filters, fun }
  let queryString = new URLSearchParams(filters).toString()
  return axios.get(`${links.getJobs}?${queryString}`)
}

export const getJobByIdService = (jobId: string) => {
  return axios.get(links.getJobDetails(jobId))
}
