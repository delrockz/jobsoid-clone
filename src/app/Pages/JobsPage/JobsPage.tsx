import { Button, Input, Select, Tag } from '@chakra-ui/react'
import React, { useState, useEffect, ChangeEvent, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDepartments, getFunctions, getLocations } from '../../API/Jobsoid'
import { Clear } from '@mui/icons-material'
import { getJobs } from '../../store/actions'
import { IReducer } from '../../../interfaces/IReducer'
import { IJob } from '../../../interfaces/IJob'
import JobCard from './components/JobCard'
import { IJobsByDepartment } from '../../../interfaces/IJobsByDepartment'
import { debounce } from '../../helpers'

const blankFilters = {
  q: '',
  dept: '',
  loc: '',
  fun: ''
}
const JobsPage: React.FC<RouteComponentProps<any>> = (props) => {
  const jobsByDepartment = useSelector((state: IReducer) => state.jobsByDepartment)
  const qRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [filters, setFilters] = useState(blankFilters)
  const [departments, setDepartments] = useState<any>([])
  const [locations, setlocations] = useState<any>([])
  const [functionsFilters, setFunctionsFilters] = useState<any>([])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    let newFilters = { ...filters }
    for (const [key, value] of searchParams.entries()) {
      newFilters = { ...newFilters, [key]: value }
    }
    setFilters(newFilters)
  }, [location.search])

  const handleGetFilters = async () => {
    const departmentsList = await getDepartments()
    const locationsList = await getLocations()
    const functionsList = await getFunctions()
    setDepartments(departmentsList)
    setlocations(locationsList)
    setFunctionsFilters(functionsList)
  }

  useEffect(() => {
    handleGetFilters()
  }, [])

  const handleGetJobs = () =>
    dispatch(getJobs({ q: filters.q, loc: filters.loc, dept: filters.dept, fun: filters.fun }))

  useEffect(() => {
    if (filters) handleGetJobs()
  }, [filters])

  const handleSearchTermChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) =>
      history.push({
        search: new URLSearchParams({ ...filters, q: e.target.value }).toString()
      })
    ),
    [filters]
  )

  return (
    <>
      <div className='py-8'>
        <div className='w-full xl:w-10/12 2xl:w-9/12 px-6 2xl:px-16 mx-auto'>
          <div className='w-full bg-gray-100 my-2 p-6'>
            <Input ref={qRef} bg={'white'} defaultValue={filters.q} onChange={handleSearchTermChange} width={'100%'} />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-6'>
              <Select
                bg={'white'}
                value={filters.dept}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  history.push({
                    search: new URLSearchParams({ ...filters, dept: e.target.value }).toString()
                  })
                }
                placeholder='Select Department'
              >
                {departments.map((department: any) => (
                  <option value={department.id}>{department.title}</option>
                ))}
              </Select>
              <Select
                bg={'white'}
                value={filters.loc}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  history.push({
                    search: new URLSearchParams({ ...filters, loc: e.target.value }).toString()
                  })
                }
                placeholder='Select Location'
              >
                {locations.map((location: any) => (
                  <option value={location.id}>{location.title}</option>
                ))}
              </Select>
              <Select
                bg={'white'}
                value={filters.fun}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  history.push({
                    search: new URLSearchParams({ ...filters, fun: e.target.value }).toString()
                  })
                }
                placeholder='Select Function'
              >
                {functionsFilters.map((functionFilter: any) => (
                  <option value={functionFilter.id}>{functionFilter.title}</option>
                ))}
              </Select>
            </div>
          </div>
          <br />
          {Object.values(filters || {}).some((x) => x) && (
            <div className='my-2 px-6 py-2 bg-gray-100 flex justify-between '>
              <div>
                {Object.entries(filters).map(
                  ([filterField, filter]) =>
                    filter && (
                      <Tag className='m-2' bg='white' color='black'>
                        {filterField === 'loc'
                          ? locations.find((o: any) => o.id === Number(filter))?.title || ''
                          : filterField === 'dept'
                          ? departments.find((o: any) => o.id === Number(filter))?.title || ''
                          : filterField === 'fun'
                          ? functionsFilters.find((o: any) => o.id === Number(filter))?.title || ''
                          : filter}
                        <span
                          onClick={() => {
                            history.push({
                              search: new URLSearchParams({ ...filters, [filterField]: '' }).toString()
                            })
                            if (filterField === 'q' && qRef.current) qRef.current.value = ''
                          }}
                        >
                          <Clear style={{ fontSize: '16px', marginLeft: 5 }} />
                        </span>
                      </Tag>
                    )
                )}
              </div>
              <Button
                className='m-2'
                variant={'link'}
                onClick={() => {
                  history.push({
                    search: new URLSearchParams(blankFilters).toString()
                  })
                  setFilters(blankFilters)
                  if (qRef.current) qRef.current.value = ''
                }}
                color='green.400'
              >
                Clear All
              </Button>
            </div>
          )}
          <div className='w-full'>
            {(jobsByDepartment || [])?.map((jobByDept: IJobsByDepartment) => (
              <div className='my-4'>
                <p className='text-3xl font-bold m-2 p-2 fancy-border relative w-fit'>{jobByDept.department}</p>
                {jobByDept.jobs?.map((job: IJob) => (
                  <JobCard job={job} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(JobsPage)
