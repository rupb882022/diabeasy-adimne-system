import React,{useEffect, useState} from 'react'
import {Get_all_comments} from '../../Functions/Api'
import ForumTable from './ForumTable'
import { Button, Container,Row } from 'react-bootstrap';

export default function Forum() {
  const [data,setData]=useState()
  useEffect(()=>{
    Get_all_comments().then((respone)=>{
      setData(respone.data)
    },(error)=>{
      console.log("error in Get_all_comments")
    })
  },[])
  return (
    <Container>
      <Row>
        <h1>All comment in forum</h1>
      </Row>
      <Row>
      {data && <ForumTable
        data={data}
      />}
      </Row>
      <Row style={{padding:'1%' }}>
     {data&& <Button variant='danger'>delete</Button>}
      </Row>
    </Container>
  )
}
