import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Hooks/Auth'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NeweBayLogForm = () => {

    const auth = useAuth()
    const [sale, setSale] = useState({})
    const  MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

    let eBayRevenueInput;
    if(sale.total_sales && sale.taxes_and_fees){
        eBayRevenueInput = <Form.Control type="text" name="ebay_revenue"/>
    } else{
        eBayRevenueInput = <Form.Control type="text" name="ebay_revenue"/>
    }

    return (

        <Form>

            <Form.Group onChange={(e) => {
                const [year, monthNum] = e.target.value.split('-')
                const month = MONTHS[parseInt(monthNum) - 1]
                const yearNum = parseInt(year)
                setSale({...sale, ['month']: month, ['year'] : yearNum})
            }}>
                <Form.Label>Date:</Form.Label>
                <Form.Control type="date" name='date' />
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Total Sales:</Form.Label>
                <Form.Control type="text" name="total_sales"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Taxes and Fees:</Form.Label>
                <Form.Control type="text" name="taxes_and_fees"/>
            </Form.Group>


            <Form.Group onChange={(e) => {
                    setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
                }}>
                <Form.Label>Ebay Revenue:</Form.Label>
                {eBayRevenueInput}

            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>eBay Fees:</Form.Label>
                <Form.Control type="text" name="ebay_fees"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Shipping Labels:</Form.Label>
                <Form.Control type="text" name="shipping_labels"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Net Sales:</Form.Label>
                <Form.Control type="text" name="net_sales"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Deposits:</Form.Label>
                <Form.Control type="text" name="deposits"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Total Refunds and Credits:</Form.Label>
                <Form.Control type="text" name="total_refunds_credits"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Total Cost of Goods:</Form.Label>
                <Form.Control type="text" name="total_cost_of_goods"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const mileage = parseFloat(e.target.value)
                setSale({...sale, [e.target.name]: mileage, ['mileage_deduction'] : (mileage * .57).toFixed(2)})
            }}>
                <Form.Label>Total Mileage:</Form.Label>
                <Form.Control type="text" name="total_mileage"/>
            </Form.Group>


            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Total Taxable Revenue:</Form.Label>
                <Form.Control type="text" name="total_taxable_revenue"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Total Expenses:</Form.Label>
                <Form.Control type="text" name="total_expenses"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Taxable Total:</Form.Label>
                <Form.Control type="text" name="taxable_total"/>
            </Form.Group>
            

            <Button
                variant="primary" type="submit"
                onClick={(e) => {
                e.preventDefault()
                console.log(sale)
                }}
            >Submit</Button>
        </Form>
  )
}

export default NeweBayLogForm