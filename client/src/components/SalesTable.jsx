import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useAuth } from '../Hooks/Auth'
import axios from 'axios';

const SalesTable = () => {

    const HEADERS = ['Month', 'Year', 'Total Sales', 'Taxes and Fees', 'eBay Revenue', 'eBay Fees', 'Shipping Labels', 'Net Sales', 'Deposits', 'Refunds/Credits', 'Cost of Goods', 'Supplies/Storage Cost', 'Mileage', 'Mileage Deduction', 'Taxable Total']

    const auth = useAuth()
    console.log(auth)

    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT


    useEffect(() => {
        axios.get(`${userEndpoint}/`)
    })
    

    return (
        <Table striped bordered hover size='sm'>
        <thead>
            <tr>
            {HEADERS.map((header, index) => {
                return <th key={index}>{header}</th>
            })}
            </tr>
        </thead>
        <tbody>
            {

            }
        </tbody>
        </Table>
    )
}

export default SalesTable