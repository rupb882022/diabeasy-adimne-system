import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Tables from '../../Tools/Tables/Tables'
import { ImageUri } from '../../Functions/Axios';

export default function ReportTable(props) {
  const { data,getRows } = props

  const columns = [
    {
      name: 'id',
      label: 'id',
      sortable: true,
      filter: true,
      hide: true
    },
    {
      name: 'date_time',
      label: 'date_time',
      sortable: true,
      filter: true,
      width:180
    },

    {
      name: 'daysLeftName',
      label: 'time left',
      sortable: true,
      filter: true,
      renderCell: (params) => {
        return <p>{params.row.daysLeft || ''} {params.row.daysLeftName|| ''} ago</p>;
      }
    }, 
    {
      name: 'sendding_user_id',
      label: 'user id',
      sortable: true,
      filter: true,
    },

    {
      name: 'name',
      label: 'user name',
      sortable: true,
      filter: true
    },
    {
      name: 'profileimage',
      label: 'user image',
      sortable: true,
      filter: true,
      renderCell: (params) => {
        let src = params.value && params.value.includes("http") ? params.value : ImageUri + params.value
        return <img style={{ maxWidth: 70,maxHeight:70, padding: 10,textAlign:'center' }} src={src} alt="no image" />
      }
    },
    {
      name: 'content',
      label: 'content',
      sortable: true,
      filter: true,width:250
    },
  ]

  return (
    <Tables
      type='materialUiTable'
      columns={columns}
      data={data}
      isSelectedRows={true}
      language='English'
      getRows={(rows)=>{getRows&&getRows(rows)}}
    />
  )
}
