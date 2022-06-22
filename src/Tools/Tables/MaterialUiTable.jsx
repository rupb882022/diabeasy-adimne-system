import React,{useState,useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function MaterialUiTable(props) {
  const { data, columns,isSelectedRows } = props
  const [selectedRows,setSelectedRows]=useState();

  const createColumns = () => {
    if (columns) {
      let generateColumns = [
        { field: "id", headerName: "id",hide:true }
      ]
      let width=(window.innerWidth-100)/columns.length ;



      columns.forEach((x, i) => {

        generateColumns.push({ key: i, field: x.name, headerName: x.label, width:width  })
      });
      return generateColumns
    }
  }
  //add unique id for each row
  const createRows = () => {
    if (data) {
      return data.map((x, i) => {
        return { id: i, ...x }
      })
    }
  }
  
  const Tablecolumns = useMemo(() => createColumns(),[columns]);
  const TableRows = useMemo(() => createRows(),[data]);

  const handelSelectedRows=(rows)=>{
    let temp=rows.map(x=>TableRows[x])
    setSelectedRows(temp)
  }
console.log(selectedRows)
  return (
    <div style={{ height: 400, width: '100%', direction: 'rtl' }}>
      {data && Tablecolumns &&
        <DataGrid
          rows={TableRows}
          columns={Tablecolumns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection={isSelectedRows}
          onSelectionModelChange={(selectdRows) => {
            handelSelectedRows(selectdRows)
          }}
          onCellClick={(row)=>{console.log("row",row)}}
        />}
    </div>
  )
}
