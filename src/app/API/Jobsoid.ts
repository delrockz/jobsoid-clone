import axios from 'axios'
import { links } from '../statics/links'

export const getDepartments = async () => {
  const response = await axios.get(links.getDepartments)
  return response.data
}

export const getLocations = async () => {
  const response = await axios.get(links.getLocations)
  return response.data
}

export const getFunctions = async () => {
  const response = await axios.get(links.getFunctions)
  return response.data
}

export const getJobsByDepartment = async (department: string) => {
  const response = await axios.get(links.getJobs + `?dept=${department}`)
  return response.data
}
