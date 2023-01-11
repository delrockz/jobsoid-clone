import React from 'react'
import { IJob } from '../../../../interfaces/IJob'
import BusinessIcon from '@mui/icons-material/Business'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useHistory } from 'react-router-dom'

function RelevantJobs({ jobs }: { jobs: IJob[] }) {
  const history = useHistory()
  return (
    <div className='bg-slate-100 border border-1 border-gray-300 p-4'>
      <p className='font-bold text-lg uppercase fancy-border relative'>Other Job Openings</p>
      {jobs.map((job: IJob) => (
        <div className='my-8'>
          <p
            className='font-semibold text-base my-2 hover:underline cursor-pointer hover:text-blue-500'
            onClick={() => history.push(`/${job.id}`)}
          >
            {job.title}
          </p>
          <div className='flex my-2 gap-4 items-center'>
            <div className='flex items-center text-sm'>
              <BusinessIcon className='text-gray-500' style={{ fontSize: '16px' }} /> &nbsp;
              {job.department.title}
            </div>
            <div className='flex items-center text-sm'>
              <LocationOnIcon className='text-gray-500' style={{ fontSize: '16px' }} />
              &nbsp;
              {job.location.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RelevantJobs
