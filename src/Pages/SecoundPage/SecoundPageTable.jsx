import React from 'react'
import Tables from '../../Tools/Tables/Tables'

export default function SecoundPageTable(props) {
  const { data } = props

  const columns = [
    {
      name: 'firstName',
      label: 'שם פרטי'
    },
    {
      name: 'lastName',
      label: 'שם משפחה'
    },
    {
      name: 'age',
      label: 'גיל'
    }
  ]

  return (
    <Tables
      type='materialUiTable'
      columns={columns}
      data={data}
      isSelectedRows={true}
    />
  )
}
