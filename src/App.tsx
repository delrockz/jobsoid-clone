import { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'

const JobsPage = lazy(() => import('./app/Pages/JobsPage/JobsPage'))
const JobDetailsPage = lazy(() => import('./app/Pages/JobDetailsPage/JobDetailsPage'))

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Suspense
          fallback={
            <center>
              <Spinner className='my-8' />
            </center>
          }
        >
          <Route exact component={JobsPage} path={'/'} />
          <Route exact component={JobDetailsPage} path={'/:jobId'} />
        </Suspense>
      </Switch>
    </div>
  )
}

export default App
