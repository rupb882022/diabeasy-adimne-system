import React from 'react'
import { Button } from 'react-bootstrap'
import Tables from '../../Tools/Tables/Tables'

export default function SecoundPageTable(props) {
  const { data } = props

  const columns = [
    {
      name: 'firstName',
      label: 'שם פרטי',
      sortable: true,
      filter: true
    },
    {
      name: 'lastName',
      label: 'שם משפחה',
      sortable: true,
      filter: true
    },
    {
      name: 'age',
      label: 'גיל',
      sortable: true,
      filter: true,
      editable: true,
      // valueFormatter:(params)=>{
      //   return `${params.value||''}!`
      // }
      // renderCell:(params)=>{
      //   return<Button>{params.value}</Button>
      // }
    }
  ]

  return (
    <Tables
      type='materialUiTable'
      columns={columns}
      data={data}
      isSelectedRows={true}
      language='Hebrew'
    />
  )
}
