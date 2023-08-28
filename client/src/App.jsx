import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import Welcome from './Pages/Welcome';
import Layout from './components/Layout';
import EbayLog from './Pages/EbayLog';
import CostOfGoods from './Pages/CostOfGoods';
import Supplies from './Pages/Supplies'
import Mileage from './Pages/Mileage'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout />,
    children : [
      {
        index : true,
        element : <Welcome />
      },
      {
        path : '/ebay-log',
        element : <EbayLog />
      },
      {
        path : '/cost-of-goods',
        element : <CostOfGoods />
      },
      {
        path : '/supplies',
        element : <Supplies />
      },
      {
        path : '/mileage',
        element : <Mileage />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
