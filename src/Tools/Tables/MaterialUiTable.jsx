import React, { useState, useMemo, useEffect } from 'react'
import { DataGrid, GridToolbar, heIL, enUS, plPL, gridRowsIdToIdLookupSelector } from '@mui/x-data-grid';
import '../Tables/Tables.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';




export default function MaterialUiTable(props) {




  const { data,
    columns,
    isSelectedRows,
    stickCol,//{left: ['ColName']}
    language,
    getRows,
    getCellEvent
  } = props
  const [selectedRows, setSelectedRows] = useState();

  const lang = () => {
    switch (language) {
      case 'Hebrew':
        return heIL
      case 'English':
        return enUS
      case 'Polish':
        return plPL
      default:
        return heIL
    }
  }

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    lang(), // x-data-grid translations
  );



  const createColumns = () => {
    let width = (window.innerWidth - 200) / columns.length;
    if (columns) {
      let generateColumns = [
        {
          field: "id",
          headerName: "id",
          hide: true,
          headerAlign: 'center',
          //  editable: true  -> make a column editable
          // type: 'date' -> type of colums value
        }
      ];
      columns.forEach((x, i) => {

        let datacol =
        {
          key: i,
          field: x.name == "id" ? 'item-' + x.name : x.name,
          headerName: x.label == "id" ? 'item-' + x.label : x.label,
          width: x.width ? x.width : width,
          headerAlign: 'center',
          editable: x.editable ? x.editable : false,
          sortable: x.sortable ? x.sortable : false,
          hide: x.hide ? x.hide : false,
          filterable: x.filter ? x.filter : false,
        }
        // renderCell(params) => ReactElement
        if (x.renderCell) {
          datacol = { renderCell: x.renderCell, ...datacol }
        }
        // valueFormatter(params) => string
        if (x.valueFormatter) {
          datacol = { valueFormatter: x.valueFormatter, ...datacol }
        }
        generateColumns.push(datacol)
      });
      return generateColumns
    }
  }
  //add unique id for each row
  const createRows = () => {
    if (data) {
      return data.map((x, i) => {
        if (x.id) {
          x['item-id'] = x['id']
          x['id'] = i;
        }
        return { id: i, ...x }
      })
    }
  }

  const Tablecolumns = useMemo(() => createColumns(), [columns]);
  const TableRows = useMemo(() => createRows(), [data]);

  const handelSelectedRows = (rows) => {
    let temp = rows.map(x => TableRows[x])
    setSelectedRows(temp)
  }



  //The function getRows should be aged outside the component 
  useEffect(() => {
    if (getRows&&selectedRows) {
      getRows(selectedRows)
    }
  }, [selectedRows])

  return (
    <div style={{ height: 400, width: '100%', direction: language === 'Hebrew' ? 'rtl' : 'ltr' }}>

      {data && Tablecolumns &&
        <ThemeProvider theme={theme}>
          <DataGrid
            getRowHeight={() => 'auto'}
            disableSelectionOnClick
            rows={TableRows}
            columns={Tablecolumns}
            loading={!TableRows || TableRows.length === 0}
            rowsPerPageOptions={[5, 25, 50, 100, 200]}
            pagination
            checkboxSelection={isSelectedRows}
            initialState={
              stickCol && {
                pinnedColumns: stickCol//stick columns to left or right
              }
            }
            onSelectionModelChange={(selectdRows) => {
              handelSelectedRows(selectdRows)
            }}
           onCellClick={(data) => { getCellEvent&&getCellEvent(data) }}
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              backgroundColor: 'white',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </ThemeProvider>}
    </div>
  )
}
