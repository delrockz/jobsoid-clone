import { Button, Tag } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { IJob } from '../../../../interfaces/IJob'
import BusinessIcon from '@mui/icons-material/Business'
import LocationOnIcon from '@mui/icons-material/LocationOn'

function JobCard({ job }: { job: IJob }) {
  const history = useHistory()

  return (
    <div className='m-2 p-2'>
      <p className='font-bold text-xl my-2'>{job.title}</p>
      <div className='flex justify-between gap-2'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 items-center'>
          <div className='flex items-center'>
            <BusinessIcon className='text-gray-500' style={{ fontSize: '16px' }} /> &nbsp;
            {job.department.title}
          </div>
          <div className='flex items-center'>
            <LocationOnIcon className='text-gray-500' style={{ fontSize: '16px' }} />
            &nbsp;
            {job.location.title}
          </div>
          <Tag className='uppercase' fontSize={12} colorScheme={'gray'} width='fit-content' height='fit-content'>
            {job.type}
          </Tag>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button
            borderRadius={20}
            color='blue.500'
            borderColor={'blue.500'}
            variant='outline'
            onClick={() => window.open(job.applyUrl)}
          >
            Apply
          </Button>
          <Button variant='link' onClick={() => history.push(`/${job.id}`)}>
            View
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobCard
