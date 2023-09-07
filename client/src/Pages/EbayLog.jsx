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



const EbayLog = () => {
  const auth = useAuth()
  const [showForm, setShowForm] = useState(false)
  const  MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  console.log(showForm)

  return (
    <Container>
      <Row>
        <h1>Add to eBay Log</h1>
      </Row>
      {
        showForm && <Row>
                      <Col>
                        <NeweBayLogForm />
                      </Col>
                      <Button variant='danger' onClick={() => handleShowForm()}>Cancel</Button>
                    </Row>
      }
      <Row>
        <Col>
          <SalesTable /> 
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={4}>
          <Button onClick={() => handleShowForm()}>Create New +</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default EbayLog