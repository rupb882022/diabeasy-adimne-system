import React, { useEffect, useState } from 'react'
import { Get_all_comments, Delete_Comment } from '../../Functions/Api'
import ForumTable from './ForumTable'
import { Button, Container, Row, Alert } from 'react-bootstrap';
import Loading from '../../Tools/Loading';

export default function Forum() {
  const [data, setData] = useState()
  const [selectedRows, setSelectedRows] = useState();
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  console.log("selectedRows", selectedRows)

  useEffect(() => {
    Get_all_comments().then((respone) => {
      setData(respone.data)
    }, (error) => {
      console.log("error in Get_all_comments")
    })
  }, [])

  const deleteRows = async () => {

    if (selectedRows.length > 0) {
      setLoading(true);
      let counter=0;
      let tempData=data;
        for (let i = 0; i < selectedRows.length; i++) {
        await Delete_Comment(selectedRows[i]['item-id']).then((respone) => {
          console.log("respone", respone)
          respone&&respone.status==200&&counter++;
          tempData=tempData.filter(x=>x['item-id']!=selectedRows[i]['item-id'])
        }, (erorr) => {
          console.log(erorr + " error in Delete_Comment")
          setAlert({
            variant: 'danger',
            body: 'cennot delete the rows'
          })
        })

      }
      setData(tempData)
      setAlert({
        variant: 'success',
        body: counter+' rows deleted'
      })
    } else {
      setAlert({
        variant: 'warning',
        body: 'you need to select some rows'
      });
    }
    setLoading(false)
  }

  return (
    <Container>
      <Row>
        <h1>All comment in forum</h1>
      </Row>
      <Row>
        {loading&&<Loading/>}
        {data && <ForumTable
          data={data}
          getRows={(rows) => { setSelectedRows(rows) }}
        />}
      </Row>
      <Row style={{ padding: '1%' }}>
        {data && <Button variant='danger'
          onClick={() => { deleteRows() }}>delete</Button>}
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
