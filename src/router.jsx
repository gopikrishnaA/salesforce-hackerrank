import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from './store'

import Loading from './components/Loading'
import { LandingPage } from './routes/Landing'
import 'bootstrap/dist/css/bootstrap.min.css'

export default () => {
  return (
    <Router history={history}>
      <>
        <Loading />
        <Route path='/' render={() => <Redirect to='/blog' />} />
        <Route path='/blog' component={LandingPage} />
      </>
    </Router>
  )
}
