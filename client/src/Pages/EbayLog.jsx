import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Hooks/Auth'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NeweBayLogForm from '../components/NeweBayLogForm';
import SalesTable from '../components/SalesTable';
import EditSaleModal from '../components/EditSaleModal';
import Modal from 'react-bootstrap/Modal';

const EbayLog = () => {
  const auth = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [saleID, setSaleID] = useState('')

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  // console.log(showForm)

  return (
    <Container>

      <Row>
        <EditSaleModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          saleid={saleID}
        />
      </Row>

      <Row>
        <h1>Add to eBay Log</h1>
      </Row>

      <Row>
        {
          showForm && <Row>
                        <Col>
                          <NeweBayLogForm />
                          <Button variant='danger' onClick={() => handleShowForm()}>Cancel</Button>
                        </Col>
                      </Row>
        }
      </Row>

      <Row className='justify-content-center'>
        <Col xs={12}>
          <SalesTable 
            setSaleID = {setSaleID}
            setModalShow = {setModalShow}
          /> 
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col sm={4} className='d-flex justify-content-center'>
          <Button onClick={() => handleShowForm()}>Create New +</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default EbayLog