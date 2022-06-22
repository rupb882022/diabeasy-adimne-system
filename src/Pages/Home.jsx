import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (<Container style={{padding:0, width: '100%' }}>
    <Row>
      <Col>
        <div style={{ backgroundColor: 'red', width: '100%' }}>
          Home
        </div>
      </Col>
      <Col>
        <div style={{ backgroundColor: 'red', width: '100%' }}>
          Home
        </div>
      </Col>
      <Col>
        <div style={{ backgroundColor: 'red', width: '100%' }}>
          Home
        </div>
      </Col>
    </Row>
  </Container>
  )
}
