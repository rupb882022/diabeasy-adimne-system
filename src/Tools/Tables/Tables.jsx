import React from 'react'
import BootstrapTable from './BootstrapTable'
export default function Tables(props) {
  const {
    type//Required- it will render the table by type
  }=props
  return (<>
    {
      type=="bootstrapTable"&&<BootstrapTable/>
    }
    </>
  )
}
