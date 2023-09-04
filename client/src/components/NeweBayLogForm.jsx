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
    const [showingEbayRevenueInput, setShowingEbayRevenueInput] = useState(false)
    const [showingNetSalesInput, setShowingNetSalesInput] = useState(false)
    const  MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
    let errors = {}
    
    const EbayRevenueInput = () => {
        return  <div>
                    <Form.Control id='ebay_revenue' type='text' name='ebay_revenue' />
                    {errors.ebay_revenue ? <p>{errors.ebay_revenue}</p> : null}
                    <Button onClick={() => {
                        const input = document.getElementById('ebay_revenue')
                        const manual_input = parseFloat(input.value)
                        
                        if(typeof manual_input === 'number' && !isNaN(manual_input)){
                            try {
                                setSale({...sale, ['ebay_revenue'] : manual_input})
                                toggleEbayRevenueInput()
                            } catch (e) {
                                console.log(e.toString())
                            }
                        } else{
                            errors = {...errors, ['ebay_revenue'] : "please enter a number"}
                            console.log(errors)
                            console.log('contains nothing or not a number')
                        }
                        
                    }}>Change</Button>
                    <Button variant='danger' onClick={toggleEbayRevenueInput}>Cancel</Button>
                </div>
    }

    const NetSalesInput = () => {
        return  <div>
                    <Form.Control id='net_sales' type='text' name='net_sales' />
                    <Button onClick={() => {
                        const input = document.getElementById('net_sales')
                        const manual_input = parseFloat(input.value)
                        // console.log(manual_input)
                        if(typeof manual_input === 'number' && !isNaN(manual_input)){
                            try {
                                setSale({...sale, ['net_sales'] : manual_input})
                                toggleNetSalesInput()
                            }
                            catch (e) {
                                console.log(e.toString())
                            }
                        }
                    }}>Change</Button>
                    <Button variant='danger' onClick={toggleNetSalesInput}>Cancel</Button>
                </div>
    }

    const toggleEbayRevenueInput = () => {
        setShowingEbayRevenueInput(!showingEbayRevenueInput)
    }

    const toggleNetSalesInput = () => {
        setShowingNetSalesInput(!showingNetSalesInput)
    }

    return (

        <Form>

            <Button onClick={() => console.log(sale)}>Show sale</Button>

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
                if(sale.taxes_and_fees){
                    setSale({...sale, ['ebay_revenue'] : parseFloat(e.target.value) - sale.taxes_and_fees, [e.target.name]: parseFloat(e.target.value)})
                }
            }}>
                <Form.Label>Total Sales:</Form.Label>
                <Form.Control type="text" name="total_sales"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
                if(sale.total_sales){
                    setSale({...sale, ['ebay_revenue'] : sale.total_sales - parseFloat(e.target.value), [e.target.name]: parseFloat(e.target.value)})
                }
            }}>
                <Form.Label>Taxes and Fees:</Form.Label>
                <Form.Control type="text" name="taxes_and_fees"/>
            </Form.Group>


            <Form.Group>
                <Form.Label>Ebay Revenue:</Form.Label>
                <p>{!isNaN(sale.ebay_revenue) ? sale.ebay_revenue : null}</p>
                {showingEbayRevenueInput ? <EbayRevenueInput/> : null}
                {!showingEbayRevenueInput ? <p onClick={toggleEbayRevenueInput}>Not look right? Click here to manually input your eBay Revenue.</p> : null}
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
                if(sale.ebay_revenue && sale.ebay_fees && sale.shipping_labels){
                    const net_sales = (sale.ebay_revenue - sale.shipping_labels - parseFloat(e.target.value)).toFixed(2)
                    setSale({...sale, ['net_sales'] : parseFloat(net_sales), [e.target.name]: parseFloat(e.target.value)})
                }
            }}>
                <Form.Label>eBay Fees:</Form.Label>
                <Form.Control type="text" name="ebay_fees"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
                if(sale.ebay_revenue && sale.ebay_fees && sale.shipping_labels){
                    const net_sales = (sale.ebay_revenue - sale.ebay_fees - parseFloat(e.target.value)).toFixed(2)
                    setSale({...sale, ['net_sales'] : parseFloat(net_sales), [e.target.name]: parseFloat(e.target.value)})
                }
            }}>
                <Form.Label>Shipping Labels:</Form.Label>
                <Form.Control type="text" name="shipping_labels"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Net Sales:</Form.Label>
                <p>{!isNaN(sale.net_sales) ? sale.net_sales : null}</p>
                {showingNetSalesInput ? <NetSalesInput /> : null}
                {!showingNetSalesInput ? <p onClick={toggleNetSalesInput}>Not look right? Click here to manually input your net sales.</p> : null}
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Deposits:</Form.Label>
                <Form.Control type="text" name="deposits"/>
            </Form.Group>

            <Form.Group>
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