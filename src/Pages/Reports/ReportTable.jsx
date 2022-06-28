import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Tables from '../../Tools/Tables/Tables'
import { ImageUri } from '../../Functions/Axios';
import { AiFillCheckCircle} from 'react-icons/ai'
import { MdCancel} from 'react-icons/md'
import { parseISO ,format } from 'date-fns';

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
      label: 'date',
      sortable: true,
      filter: true,
      width:180,
      renderCell: (params) => {
         return <p style={{marginBottom: 0}}>{format(parseISO (params.row.date_time), 'dd-MM-yyyy')}</p>;
      }
    },

    {
      name: 'daysLeftName',
      label: 'time left',
      sortable: true,
      filter: true,
      renderCell: (params) => {
        return <p style={{marginBottom: 0}}>{params.row.daysLeft || ''} {params.row.daysLeftName|| ''} ago</p>;
      }
    }, 
    {
      name: 'sendding_user_id',
      label: 'user id',
      sortable: true,
      filter: true,
      width:120
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
      filter: true,
      width:250
    },
    {
      name: 'active',
      label: 'is solved',
      sortable: true,
      filter: true,
      renderCell: (params) => {
        return params.value?<MdCancel style={{fontSize:25,color:'red',textAlign:'center'}}/>:<AiFillCheckCircle style={{fontSize:25,color:'green',textAlign:'center'}}/>;
      }
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
