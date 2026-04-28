import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import LogIn from './pages/LogIn'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import DetailProducts from './pages/DetailProducts'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Brands from './pages/Brands'
import Layout from './pages/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn />} />
        <Route path='/' element={<Layout />}>
          <Route path='/Categories' element={<Categories />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/DetailProducts' element={<DetailProducts />} />
          <Route path='/Orders' element={<Orders />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Brands' element={<Brands />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}




export default App