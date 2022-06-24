import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Tables from '../../Tools/Tables/Tables'
import { ImageUri } from '../../Functions/Axios';

export default function ForumTable(props) {
  const { data, isRecipe } = props
  // const [rows,setRows]=useState()

  const columns = [
    {
      name: 'id',
      label: 'item-id',
      sortable: true,
      filter: true,
      hide: true
    },
    {
      name: 'userId',
      label: 'userId',
      sortable: true,
      filter: true,
      hide:true
    },
    {
      name: 'date_time',
      label: 'date_time',
      sortable: true,
      filter: true,
      width:180
    },
    
    {
      name: 'userName',
      label: 'userName',
      sortable: true,
      filter: true
    },
    
    {
      name: 'profileimage',
      label: 'profileimage',
      sortable: true,
      filter: true,
      renderCell: (params) => {
        let src = params.value && params.value.includes("http") ? params.value : ImageUri + params.value
        return <img style={{ maxWidth: 70,maxHeight:70, padding: 10,textAlign:'center' }} src={src} alt="no image" />
      }
    },
    {
      name: 'subject',
      label: 'subject',
      sortable: true,
      filter: true
    },

    {
      name: 'value',
      label: 'comment',
      sortable: true,
      filter: true
    },
    {
      name: 'Id_Continue_comment',
      label: 'Id_Continue_comment',
      sortable: true,
      filter: true
    },
  ]

  return (
    <Tables
      type='materialUiTable'
      columns={columns}
      data={data}
      isSelectedRows={true}
      language='English'
    // getTablerows={(values)=>{setRows(values)}}
    />
  )
}
