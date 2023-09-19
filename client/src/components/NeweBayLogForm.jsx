import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Hooks/Auth'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const NeweBayLogForm = () => {

    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT
    const auth = useAuth()

    const [sale, setSale] = useState({})
    const [showingEbayRevenueInput, setShowingEbayRevenueInput] = useState(false)
    const [showingNetSalesInput, setShowingNetSalesInput] = useState(false)
    const [showingTotalRefundsCreditsInput, setShowingTotalRefundsCreditsInput] = useState(false)
    const [showingMileageDeductionInput, setShowingMileageDeductionInput] = useState(false)
    const  MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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
                                if(sale.deposits){
                                    setSale({...sale, ['net_sales'] : manual_input, ['total_refunds_credits'] : manual_input - sale.deposits})
                                }
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

    const TotalRefundsCreditsInput = () => {
        return  <div>
                    <Form.Control id='total_refunds_credits' type='text' name='total_refunds_credits' />
                    <Button onClick={() => {
                        const input = document.getElementById('total_refunds_credits')
                        const manual_input = parseFloat(input.value)
                        // console.log(manual_input)
                        if(typeof manual_input === 'number' && !isNaN(manual_input)){
                            try {
                                setSale({...sale, ['total_refunds_credits'] : manual_input})
                                toggleTotalRefundsCreditsInput()
                            }
                            catch (e) {
                                console.log(e.toString())
                            }
                        }
                    }}>Change</Button>
                    <Button variant='danger' onClick={toggleTotalRefundsCreditsInput}>Cancel</Button>
                </div>
    }

    const MileageDeductionInput = () => {
        return  <div>
                    <Form.Control id='mileage_deduction' type='text' name='mileage_deduction'/> 
                    <Button onClick={() => {
                        const input = document.getElementById('mileage_deduction')
                        const manual_input = parseFloat(input.value)
                        // console.log(manual_input)
                        if(typeof manual_input === 'number' && !isNaN(manual_input)){
                            try {
                                setSale({...sale, ['mileage_deduction'] : manual_input})
                                toggleMileageDeductionInput()
                            }
                            catch (e) {
                                console.log(e.toString())
                            }
                        }
                    }}>Change</Button>
                    <Button variant='danger' onClick={toggleMileageDeductionInput}>Cancel</Button>
                </div>
    }

    const toggleEbayRevenueInput = () => {
        setShowingEbayRevenueInput(!showingEbayRevenueInput)
    }

    const toggleNetSalesInput = () => {
        setShowingNetSalesInput(!showingNetSalesInput)
    }

    const toggleTotalRefundsCreditsInput = () => {
        setShowingTotalRefundsCreditsInput(!showingTotalRefundsCreditsInput)
    }

    const toggleMileageDeductionInput = () => {
        setShowingMileageDeductionInput(!showingMileageDeductionInput)
    }

    const handleSubmit = () => {
        const fullSale = {...sale, 
            ['userID'] : auth.userID, 
            ['total_taxable_revenue'] : sale.ebay_revenue
        }
        axios.post(`${userEndpoint}/add-to-sales`, fullSale)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
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
                <p>${!isNaN(sale.ebay_revenue) ? sale.ebay_revenue : 0}</p>
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
                <p>${!isNaN(sale.net_sales) ? sale.net_sales : 0}</p>
                {showingNetSalesInput ? <NetSalesInput /> : null}
                {!showingNetSalesInput ? <p onClick={toggleNetSalesInput}>Not look right? Click here to manually input your net sales.</p> : null}
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
                if(sale.net_sales){
                    const total_refund_credits = (sale.net_sales - parseFloat(e.target.value)).toFixed(2)
                    setSale({...sale, [e.target.name]: parseFloat(e.target.value), ['total_refunds_credits'] : parseFloat(total_refund_credits)})
                }
            }}>
                <Form.Label>Deposits:</Form.Label>
                <Form.Control type="text" name="deposits"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Total Refunds and Credits:</Form.Label>
                <p>${!isNaN(sale.total_refunds_credits) ? sale.total_refunds_credits : 0}</p>
                {showingTotalRefundsCreditsInput ? <TotalRefundsCreditsInput /> : null}
                {!showingTotalRefundsCreditsInput ? <p onClick={toggleTotalRefundsCreditsInput}>Not look right? Click here to manually input your refunds and credits.</p> : null}
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, [e.target.name]: parseFloat(e.target.value)})
            }}>
                <Form.Label>Total Cost of Goods:</Form.Label>
                <Form.Control type="text" name="total_cost_of_goods"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                setSale({...sale, ['supplies_storage_costs'] : parseFloat(e.target.value)})
            }}>
                <Form.Label>Supplies / Storage Costs:</Form.Label>
                <Form.Control type="text" name="supplies_storage_costs"/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const mileage = parseFloat(e.target.value)
                const mileage_deduction = (mileage * .57).toFixed(2)
                setSale({...sale, [e.target.name]: mileage, ['mileage_deduction'] : parseFloat(mileage_deduction)})
                if(sale.ebay_fees && sale.shipping_labels && sale.total_refunds_credits && sale.total_cost_of_goods && sale.supplies_storage_costs){
                    const total_expenses = (sale.ebay_fees + sale.shipping_labels + sale.total_refunds_credits + sale.total_cost_of_goods + sale.supplies_storage_costs + parseFloat(mileage_deduction))
                    const taxable_total = sale.deposits - sale.total_cost_of_goods - sale.supplies_storage_costs - parseFloat(mileage_deduction)
                    console.log(taxable_total)
                    setSale({...sale, ['total_mileage'] : mileage, ['mileage_deduction'] : parseFloat(mileage_deduction), ['total_expenses'] : parseFloat(total_expenses), ['taxable_total'] : taxable_total})
                }
            }}>
                <Form.Label>Total Mileage:</Form.Label>
                <Form.Control type="text" name="total_mileage"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Mileage Deduction:</Form.Label>
                <p>{!isNaN(sale.mileage_deduction) ? sale.mileage_deduction : 0}</p>
                {showingMileageDeductionInput ? <MileageDeductionInput /> : null}
                {!showingMileageDeductionInput ? <p onClick={toggleMileageDeductionInput}>Not look right? Click here to manually input your mileage deductions.</p> : null}
            </Form.Group>

            <Form.Group>
                <Form.Label>Total Taxable Revenue:</Form.Label>
                <p>${!isNaN(sale.ebay_revenue) ? sale.ebay_revenue : 0}</p>
            </Form.Group>

            <Form.Group>
                <Form.Label>Total Expenses:</Form.Label>
                <p>${sale.total_expenses ? sale.total_expenses : 0}</p>
            </Form.Group>

            <Form.Group>
                <Form.Label>Taxable Total:</Form.Label>
                <p>${sale.taxable_total ? sale.taxable_total : 0}</p>
            </Form.Group>         

            <Button
                variant="primary" type="submit"
                onClick={(e) => {
                e.preventDefault()
                handleSubmit()
                }}
            >Submit</Button>
        </Form>
  )
}

export default NeweBayLogForm