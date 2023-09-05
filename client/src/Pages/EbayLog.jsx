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
  const [sale, setSale] = useState({})
  const  MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]


  return (
    <Container>
      <Row>
        <h1>Add to eBay Log</h1>
      </Row>
      {
      //   <Row>
      //   <Col>
      //     <NeweBayLogForm />
      //   </Col>
      // </Row>
      }
      <Row>
        <Col md={6}>
          <SalesTable /> 
        </Col>
      </Row>
    </Container>
  )
}

export default EbayLog