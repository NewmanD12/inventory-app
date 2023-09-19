import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useAuth } from '../Hooks/Auth'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './SalesTable.css'

const SalesTable = (props) => {

    const HEADERS = ['Month', 'Year', 'Total Sales', 'Taxes and Fees', 'eBay Revenue', 'eBay Fees', 'Shipping Labels', 'Net Sales', 'Deposits', 'Refunds/Credits', 'Cost of Goods', 'Supplies/Storage Cost', 'Mileage', 'Mileage Deduction', 'Taxable Total', 'Actions']

    // console.log(props)

    const auth = useAuth()
    const [user, setUser] = useState({})
    // console.log(user)

    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT

    // console.log(user)

    useEffect(() => {
        if(auth.userID){
            axios.get(`${userEndpoint}/find-user/${auth.userID}`)
                    .then((res) => setUser(res.data.user))
                    .catch((err) => console.log(err))
        }
    }, [auth])
    

    return (
        <Table striped bordered hover>
        <thead>
            <tr>
            {HEADERS.map((header, index) => {
                return <th key={index}>{header}</th>
            })}
            </tr>
        </thead>
        <tbody>
            { 
                user.sales && user.sales.map((sale, index) => {
                    return  <tr key={index} className='text-center align-middle'>
                                <td className='sale_month_td'>{sale.month}</td>
                                <td className='sale_year_td'>{sale.year}</td>
                                <td>{sale.total_sales}</td>
                                <td>{sale.taxes_and_fees}</td>
                                <td>{sale.ebay_revenue}</td>
                                <td>{sale.ebay_fees}</td>
                                <td>{sale.shipping_labels}</td>
                                <td>{sale.net_sales}</td>
                                <td>{sale.deposits}</td>
                                <td>{sale.total_refunds_credits}</td>
                                <td>{sale.total_cost_of_goods}</td>
                                <td>{sale.supplies_storage_costs}</td>
                                <td>{sale.total_mileage}</td>
                                <td>{sale.mileage_deduction}</td>
                                <td>{sale.taxable_total}</td>
                                <td><Button onClick={() => {
                                    props.setModalShow(true)
                                    props.setSaleID(sale._id)
                                }}>Edit</Button></td>
                            </tr>
                })
            }
        </tbody>
        </Table>
    )
}

export default SalesTable