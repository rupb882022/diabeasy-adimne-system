import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Get_admin_details } from '../Functions/Api'
export default function Home() {
  const [kpi, setKpi] = useState();
  useEffect(() => {
    Get_admin_details().then((respone) => {
      if (respone.status == 200) {


        let data = []
        Object.entries(respone.data[0]).forEach(([key, value]) => data[key] = value)
        console.log("data", data)
        setKpi(respone.data[0])
      } else {
        throw new Error()
      }
    }, (error) => {
      console.log("error in Get_admin_details")
    })
  }, [])

  return (<Container style={{ padding: '3% 1% 0 8%'}}>
    {/* <Row  style={{justifyContent:'center',paddingRight:'9%'}}>
      <Col>
      <h1>Diabeasy details</h1>
      </Col>
    </Row> */}
    {kpi&&<Row style={{justifyContent:'center'}}>
      <Col xs={12} md={6} lg={4}>
        <Card
          style={{ width: '18rem', height: '18rem' ,border:'2px solid #5c5cff',backgroundColor:'rgb(229 255 255 / 86%)', boxShadow:'0 0 10px #9ecaed'}}
          className="mb-2"
        >
          <Card.Header style={{fontSize:40,fontWeight:'bold'}}>Users</Card.Header>
          <Card.Body>
            <Card.Text style={{fontSize:30,fontWeight:600}}>
            Total: {kpi.Doctors+kpi.Patients}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Patients: {kpi.Patients}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Doctors: {kpi.Doctors}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Card
          style={{ width: '18rem', height: '18rem' ,border:'2px solid #5c5cff',backgroundColor:'rgb(229 255 255 / 86%)', boxShadow:'0 0 10px #9ecaed'}}
          className="mb-2"
        >
          <Card.Header style={{fontSize:40,fontWeight:'bold'}}>Reports</Card.Header>
          <Card.Body>
            <Card.Text style={{fontSize:30,fontWeight:600}}>
            Total:{kpi.report}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Open: {kpi.openReport}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Close: {kpi.report-kpi.openReport}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Card
          style={{ width: '18rem', height: '18rem' ,border:'2px solid #5c5cff',backgroundColor:'rgb(229 255 255 / 86%)', boxShadow:'0 0 10px #9ecaed'}}
          className="mb-2"
        >
          <Card.Header style={{fontSize:30,fontWeight:'bold'}}>Recommendation</Card.Header>
          <Card.Body>
            <Card.Text style={{fontSize:30,fontWeight:600}}>
            Total: {kpi.goodReco+kpi.bedReco}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Use: {kpi.goodReco}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Ratio: {(kpi.goodReco/(kpi.goodReco+kpi.bedReco)*100).toFixed(1)}%
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Card
          style={{marginTop:'3%', width: '18rem', height: '18rem' ,border:'2px solid #5c5cff',backgroundColor:'rgb(229 255 255 / 86%)', boxShadow:'0 0 10px #9ecaed'}}
          className="mb-2"
        >
          <Card.Header style={{fontSize:40,fontWeight:'bold'}}>Forum</Card.Header>
          <Card.Body>
            <Card.Text style={{fontSize:30,fontWeight:600}}>
            Subjects: {kpi.subject}
            </Card.Text>
            <Card.Text style={{fontSize:30,fontWeight:600}}>
            Comments: {kpi.forum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Card
          style={{marginTop:'3%', width: '18rem', height: '18rem' ,border:'2px solid #5c5cff',backgroundColor:'rgb(229 255 255 / 86%)', boxShadow:'0 0 10px #9ecaed'}}
          className="mb-2"
        >
          <Card.Header style={{fontSize:30,fontWeight:'bold',flexWrap:'warp'}}>Food added by users</Card.Header>
          <Card.Body>
            <Card.Text style={{fontSize:25,fontWeight:600}}>
            Total: {kpi.Recipes+kpi.Ingredients}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Ingredients: {kpi.Ingredients}
            </Card.Text>
            <Card.Text style={{fontSize:20,fontWeight:400}}>
            Recipes: {kpi.Recipes}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>}
  </Container>
  )
}
