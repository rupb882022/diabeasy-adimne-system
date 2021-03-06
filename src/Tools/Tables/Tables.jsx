import React from 'react'
import BootstrapTable from './BootstrapTable'
import MaterialUiTable from './MaterialUiTable'
export default function Tables(props) {
  const {
    type//Required- it will render the table by type     *Required*
   , data //json with data                               *Required*
   ,columns //json with columns configuration            *Required*
   ,isSelectedRows=false //for checkbox select rows
   ,language='Hebrew'
   ,getRows
   ,getCellEvent
  }=props




  const table=()=>{
    switch (type) {
      case "bootstrapTable":
       return <BootstrapTable
       data={data}
       columns={columns}
       />;
       case "materialUiTable":
        return <MaterialUiTable
        data={data}
        columns={columns}
        isSelectedRows={isSelectedRows}
        language={language}
        getRows={(rows)=>{getRows&&getRows(rows)}}
        getCellEvent={(data) => { getCellEvent&&getCellEvent(data) }}
        />;
      default:
        break;
  }
}
  return (<>
    {table()}
    </>
  )
}
