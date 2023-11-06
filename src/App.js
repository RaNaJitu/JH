import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import './scss/style.scss'
import routes from './routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {routes.map((props, index) => {
              const { path, name, element } = props
              return (<Route key={index} name={name} path={path} element={element} />)
            })}
            <Route path='/' element={<Navigate replace to="/admin/login" />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
