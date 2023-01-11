import { Button, Divider, IconButton, Tag } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IReducer } from '../../../interfaces/IReducer'
import { getJobById } from '../../store/actions'
import BusinessIcon from '@mui/icons-material/Business'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { IJob } from '../../../interfaces/IJob'
import { getJobsByDepartment } from '../../API/Jobsoid'
import RelevantJobs from './components/RelevantJobs'
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material'

const JobDetailsPage = () => {
  const dispatch = useDispatch()
  const jobDetails = useSelector((state: IReducer) => state.jobDetails)
  const [relevantJobs, setRelevantJobs] = useState([] as IJob[])
  const { jobId }: { jobId: string } = useParams()

  useEffect(() => {
    if (jobId) dispatch(getJobById(jobId))
  }, [jobId])

  const getRelevantJobs = async () => {
    const jobs = await getJobsByDepartment(jobDetails.department.id)
    setRelevantJobs(jobs)
  }

  useEffect(() => {
    if (jobDetails?.department?.id) getRelevantJobs()
  }, [jobDetails?.department?.id])

  return (
    <>
      <div className='py-8'>
        <div className='w-full xl:w-10/12 2xl:w-9/12 px-6 2xl:px-16 mx-auto'>
          <p className='font-semibold text-xl my-2'>{jobDetails.department.title} department At Teknorix Systems Goa</p>
          <p className='font-bold text-3xl my-2'>{jobDetails.title}</p>
          <div className='flex my-2 gap-4 items-center'>
            <div className='flex items-center'>
              <BusinessIcon className='text-gray-500' style={{ fontSize: '16px' }} /> &nbsp;
              {jobDetails.department.title}
            </div>
            <div className='flex items-center'>
              <LocationOnIcon className='text-gray-500' style={{ fontSize: '16px' }} />
              &nbsp;
              {jobDetails.location.title}
            </div>
            <Tag className='uppercase' fontSize={12} colorScheme={'gray'} width='fit-content' height='fit-content'>
              {jobDetails.type}
            </Tag>
          </div>
          <br />
          <Button
            borderRadius={20}
            width={150}
            color='white'
            colorScheme={'blue'}
            bg={'blue.500'}
            variant='outline'
            onClick={() => window.open(jobDetails.applyUrl)}
          >
            Apply
          </Button>
          <br />
          <br />
          <Divider />
          <div className='my-2 py-2 grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <div
              className='col-span-1 md:col-span-4'
              dangerouslySetInnerHTML={{ __html: jobDetails.description }}
            ></div>
            <div className='col-span-1 md:col-span-2'>
              <RelevantJobs jobs={relevantJobs} /> <br />
              <div className='p-4'>
                <p className='font-bold text-lg uppercase fancy-border relative'>Share Job Openings</p>
                <div className='flex items-center gap-2 my-4'>
                  <IconButton borderRadius={50} aria-label='' icon={<Facebook />}></IconButton>
                  <IconButton
                    borderRadius={50}
                    aria-label=''
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=Teknorix&source=LinkedIn`
                      )
                    }
                    icon={<LinkedIn />}
                  ></IconButton>
                  <IconButton
                    borderRadius={50}
                    aria-label=''
                    onClick={() =>
                      window.open(
                        `http://twitter.com/share?text=Check%20out%20Teknorix%27s%20job%20posting&url=${window.location.href}`
                      )
                    }
                    icon={<Twitter />}
                  ></IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetailsPage
