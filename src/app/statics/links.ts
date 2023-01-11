const host = import.meta.env.VITE_JOBSOID_API_ENDPOINT || ''

export const links = {
  getJobs: `${host}/api/v1/jobs`,
  getJobDetails: (jobId: string) => `${host}/api/v1/jobs/${jobId}`,
  getDepartments: `${host}/api/v1/departments`,
  getLocations: `${host}/api/v1/locations`,
  getFunctions: `${host}/api/v1/functions`
}
