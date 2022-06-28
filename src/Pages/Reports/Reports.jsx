import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Alert } from 'react-bootstrap';
import Loading from '../../Tools/Loading';
import { getReports, problemSolved } from '../../Functions/Api'
import ReportTable from './ReportTable'

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  const [selectedRows, setSelectedRows] = useState();
  const [alert, setAlert] = useState();


  useEffect(() => {
    getReports().then((respone) => {
      if (respone.status === 200) {
        setData(respone.data)
      }
    }, (error) => {
      console.log("error in getReports")
    })
  }, [])

  const markSolvedProblam = () => {
    if (selectedRows.length > 0) {
      setLoading(true);
      console.log("selectedRows", selectedRows)
      let data = selectedRows.map(x => {
        return {
          id: x['item-id'],
          active: x.active,
          content: x.content,
          date_time: x.date_time,
          daysLeft: x.daysLeft,
          daysLeftName: x.daysLeftName,
          getting_user_id: x.getting_user_id,
          sendding_user_id: x.sendding_user_id,
          date_time:new Date()
        }
      })
      console.log("data",data)
      problemSolved(data).then((respone) => {
        console.log("respone", respone)
        if(respone.status==200){
          getReports().then((respone) => {
            if (respone.status === 200) {
              setData(respone.data)
            }
          }, (error) => {
            console.log("error in getReports")
          })
        }
      }, (error) => {
        console.log(error + " error in problemSolved")
        setAlert({
          variant: 'danger',
          body: 'cennot update the rows'
        })
      })
      setLoading(false)
    } else {
      setAlert({
        variant: 'warning',
        body: 'you need to select some rows'
      });
    }

  }

  return (
    <Container>
      <Row>
        <h1>users Report</h1>
      </Row>
      <Row>
        {loading && <Loading />}
        {data && <ReportTable
          data={data}
          getRows={(rows) => { setSelectedRows(rows) }}
        />}
      </Row>
      <Row style={{ padding: '1%' }}>
        {data && <Button variant='primary'
          onClick={() => { markSolvedProblam() }}>Mark as a problem solved</Button>}
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
