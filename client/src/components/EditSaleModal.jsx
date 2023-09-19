import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../Hooks/Auth'
import Form from 'react-bootstrap/Form';

const EditSaleModal = (props) => {
    const { saleid, onHide} = props
    const auth = useAuth()
    const [user, setUser] = useState({})
    const [saleToEdit, setSaleToEdit] = useState({})
    const [newSale, setNewSale] = useState({})

    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT

    useEffect(() => {
        if(auth.userID){
            axios.get(`${userEndpoint}/find-user/${auth.userID}`)
                    .then((res) => setUser(res.data.user))
                    .catch((err) => console.log(err))
        }
    }, [auth])

    useEffect(() => {
        if(user.firstName){
            if(saleid){
                const saleToFind = user.sales.filter((sale) => sale._id === saleid)[0]
                setNewSale(saleToFind)
            }
        }
    }, [saleid])

    useEffect(() => {
        if(saleToEdit.month){
            setNewSale({...newSale, ['month'] : saleToEdit.month, ['year'] : saleToEdit.year})
        }
    }, [saleToEdit])

    // console.log(newSale)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit your sale
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            
            <Form.Group>
                <Form.Label>Month:</Form.Label>
                <Form.Control type='text' name='date' disabled placeholder={newSale.month}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Year:</Form.Label>
                <Form.Control type='year' name='date' disabled placeholder={newSale.year}/>
            </Form.Group>
            
            <Form.Group onChange={(e) => {
                setNewSale({...newSale, 
                    [e.target.name] : parseFloat(e.target.value), 
                    ['ebay_revenue'] : (parseFloat(e.target.value) - newSale.taxes_and_fees).toFixed(2)
                })
            }}>
                <Form.Label>Total Sales:</Form.Label>
                <Form.Control type='text' name='total_sales'
                placeholder={newSale.total_sales}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_taxes_and_fees = parseFloat(e.target.value)
                setNewSale({...newSale, [e.target.name] : new_taxes_and_fees, ['ebay_revenue'] : (newSale.total_sales - new_taxes_and_fees).toFixed(2)})
            }}>
                <Form.Label>Taxes and Fees:</Form.Label>
                <Form.Control type='text' name='taxes_and_fees'
                placeholder={newSale.taxes_and_fees}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_ebay_revenue = parseFloat(e.target.value)
                setNewSale({...newSale, [e.target.name] : new_ebay_revenue, ['net_sales'] : (new_ebay_revenue - newSale.ebay_fees - newSale.shipping_labels).toFixed(2), ['total_taxable_revenue'] : new_ebay_revenue})
            }}>
                <Form.Label>eBay Revenue:</Form.Label>
                <Form.Control type='text' name='ebay_revenue'
                placeholder={newSale.ebay_revenue}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_ebay_fees = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : new_ebay_fees, 
                    ['net_sales'] : (newSale.ebay_revenue - new_ebay_fees - newSale.shipping_labels).toFixed(2),
                    ['total_expenses'] : (new_ebay_fees + newSale.shipping_labels + newSale.total_refunds_credits + newSale.total_cost_of_goods + newSale.supplies_storage_costs + newSale.mileage_deduction).toFixed(2)
                })
            }}>
                <Form.Label>eBay Fees:</Form.Label>
                <Form.Control type='text' name='ebay_fees'
                placeholder={newSale.ebay_fees}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_shipping_labels = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : new_shipping_labels, 
                    ['net_sales'] : (newSale.ebay_revenue - newSale.ebay_fees - new_shipping_labels).toFixed(2), 
                    ['total_expenses'] : (newSale.ebay_fees + new_shipping_labels + newSale.total_refunds_credits + newSale.total_cost_of_goods + newSale.supplies_storage_costs + newSale.mileage_deduction).toFixed(2)
                })
            }}>
                <Form.Label>Shipping Labels:</Form.Label>
                <Form.Control type='text' name='shipping_labels'
                placeholder={newSale.shipping_labels}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_net_sales = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : new_net_sales, 
                    ['total_refunds_credits'] : (new_net_sales - newSale.deposits).toFixed(2)
                })
            }}>
                <Form.Label>Net Sales:</Form.Label>
                <Form.Control type='text' name='net_sales'
                placeholder={newSale.net_sales}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_deposits = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : new_deposits, 
                    ['total_refunds_credits'] : (newSale.net_sales - new_deposits).toFixed(2)
                })
            }}>
                <Form.Label>Deposits:</Form.Label>
                <Form.Control type='text' name='deposits'
                placeholder={newSale.deposits}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const new_refunds_credits = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : new_refunds_credits, 
                    ['total_expenses'] : (newSale.ebay_fees + newSale.shipping_labels + new_refunds_credits + newSale.total_cost_of_goods + newSale.supplies_storage_costs + newSale.mileage_deduction).toFixed(2)
                })
            }}>
                <Form.Label>Refunds/Credits:</Form.Label>
                <Form.Control type='text' name='total_refunds_credits'
                placeholder={newSale.total_refunds_credits}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const newTotalCOG = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : newTotalCOG,
                    ['total_expenses'] : (newSale.ebay_fees + newSale.shipping_labels + newSale.total_refunds_credits + newTotalCOG + newSale.supplies_storage_costs + newSale.mileage_deduction)
                })
            }}>
                <Form.Label>Cost of Goods:</Form.Label>
                <Form.Control type='text' name='total_cost_of_goods'
                placeholder={newSale.total_cost_of_goods}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const newSuppliesStorageCosts = parseFloat(e.target.value)
                setNewSale({...newSale, 
                    [e.target.name] : newSuppliesStorageCosts,
                    ['total_expenses'] : (newSale.ebay_fees + newSale.shipping_labels + newSale.total_refunds_credits + newSale.total_cost_of_goods + newSuppliesStorageCosts + newSale.mileage_deduction).toFixed(2)
                })
            }}>
                <Form.Label>Supplies/Storage Cost:</Form.Label>
                <Form.Control type='text' name='supplies_storage_costs'
                placeholder={newSale.supplies_storage_costs}/>
            </Form.Group>

            <Form.Group onChange={(e) => {
                const newMileage = parseFloat(e.target.value)
                const newMileageDeduction = (newMileage * 0.57).toFixed(2)
                setNewSale({...newSale, 
                    [e.target.name] : newMileage,
                    ['mileage_deduction'] : parseFloat(newMileageDeduction),
                    ['total_expenses'] : (newSale.ebay_fees + newSale.shipping_labels + newSale.total_refunds_credits + newSale.total_cost_of_goods + newSale.supplies_storage_costs + newMileageDeduction).toFixed(2)
                })
            }}>
                <Form.Label>Mileage:</Form.Label>
                <Form.Control type='text' name='total_mileage'
                placeholder={newSale.total_mileage}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Mileage Deduction:</Form.Label>
                <Form.Control type='text' name='mileage_deduction'
                placeholder={newSale.mileage_deduction} disabled/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Total Expenses:</Form.Label>
                <Form.Control type='text' disabled placeholder={newSale.total_expenses}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Total Taxable Revenue:</Form.Label>
                <Form.Control type='text' disabled placeholder={newSale.total_taxable_revenue}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Total Expenses:</Form.Label>
                <Form.Control type='text' disabled placeholder={newSale.total_expenses}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Total you are taxes on:</Form.Label>
                <Form.Control type='text' name='taxable_total'
                placeholder={newSale.taxable_total} disabled/>
            </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button onClick={() => console.log(newSale)}>Submit</Button>
        <Button variant='danger' onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditSaleModal