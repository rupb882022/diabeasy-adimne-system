import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Alert } from 'react-bootstrap';
import Loading from '../../Tools/Loading';
import { getReports } from '../../Functions/Api'
import ReportTable from './ReportTable'

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  const [selectedRows, setSelectedRows] = useState();
  const [alert, setAlert] = useState();


  useEffect(() => {
    getReports().then((respone) => {
      setData(respone.data)

    }, (error) => {
      console.log("error in getReports")
    })
  }, [])
console.log(data)
  return (
    <Container>
    <Row>
      <h1>users Report</h1>
    </Row>
    <Row>
      {loading&&<Loading/>}
      {data && <ReportTable
        data={data}
        getRows={(rows) => { setSelectedRows(rows) }}
      />}
    </Row>
    <Row style={{ padding: '1%' }}>
      {/* {data && <Button variant='danger'
        onClick={() => { deleteRows() }}>delete</Button>} */}
    </Row>
    {alert &&
      <Alert className='alert' variant={alert && alert.variant ? alert.variant : 'primary'}>
        {alert && alert.body &&
          <p className='alertBody'>
            {alert.body}
          </p>}
      </Alert>}
  </Container>
  )
}
