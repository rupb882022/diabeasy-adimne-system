import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import Tables from '../../Tools/Tables/Tables'
import Form from 'react-bootstrap/Form'
import { ImageUri } from '../../Functions/Axios'
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

export default function FoodTable(props) {
  const { data, isRecipe } = props
  const [rows,setRows]=useState()

  const columns = isRecipe ? [
    {
      name: 'id',
      label: 'Id',
      sortable: true,
      filter: true,
      hide: true
    },
    {
      name: 'image',
      label: 'Image',
      sortable: true,
      filter: false,
      width:85,
      renderCell: (params) => {
        let src = params.value && params.value.includes("http") ? params.value : ImageUri + params.value
        return <img style={{ maxWidth: 70,maxHeight:70, padding: 10 }} src={src} alt="no image" />
      }
    },
    {
      name: 'name',
      label: 'Name',
      sortable: true,
      filter: true
    },
    {
      name: 'category',
      label: 'Category',
      sortable: false,
      filter: false,
      width:150,
      renderCell: (params) => {
        return <ul> {params && params.value ? params.value.map(x => <li style={{textAlign:'left'}} key={x.id} value={x.id}>{x.name}</li>) : <></>} </ul>
      }
    },
    {
      name: 'UnitOfMeasure',
      label: 'Unit of measure',
      sortable: false,
      filter: false,
      width:150,
      renderCell: (params) => {
        return <ul> {params && params.value ? params.value.map(x => <li style={{textAlign:'left'}} key={x.id} value={x.id}>{x.name}</li>) : <></>} </ul>
      }
    },
    {
      name: 'Ingrediants',
      label: 'Ingrediants',
      sortable: false,
      filter: false,
      renderCell: (params) => {
        return <ul> {params && params.value ? params.value.map(x => <li style={{textAlign:'left'}} key={x.id} value={x.id}>{x.name}</li>) : <></>} </ul>
      }
    },
    {
      name: 'cookingMethod',
      label: 'Cooking method',
      width:150,
      sortable: true,
      filter: true,
      renderCell: (params) => {
        return <p style={{flexWrap:'wrap',overflow:'auto',height:'100%',paddingTop: '7%'}}>{params.value}</p>;
      }
    },
    {
      name: 'addByUserId',
      label: 'Add by user',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return `${params.value || 'add by system'}`;
      }
    },
    {
      label: 'Total carbohydrates',
      name: 'totalCarbohydrates',
      sortable: true,
      filter: true
    },
    {
      label: 'Total sugars',
      name: 'totalsugars',
      sortable: true,
      filter: true
    },
    {
      label: 'Total weigth in grams',
      name: 'totalWeigthInGrams',
      sortable: true,
      filter: true
    },
    {
      name: 'edit',
      label: 'Edit',
      sortable: false,
      filter: false,
      width:100,
      renderCell: (params) => {
        return <BsFillPencilFill
            style={{ fontSize: 20, marginLeft: '35%'}}
          />
      }
    },
    {
      name: 'delete',
      label: 'Delete',
      sortable: false,
      filter: false,
      width:100,
      renderCell: (params) => {
        return <BsTrash
        style={{ fontSize: 20, marginLeft: '35%' }}
      />
      }
    },
  ] :
    [
      {
        name: 'id',
        label: 'Id',
        sortable: true,
        filter: true,
        hide: true
      },
      {
        name: 'image',
        label: 'Image',
        sortable: true,
        filter: false,
        width:85,
        renderCell: (params) => {
          let src = params.value && params.value.includes("http") ? params.value : ImageUri + params.value
          return <img style={{ maxWidth: 70,maxHeight:70, padding: 10 }} src={src} alt="no image" />
        }
      },
      {
        name: 'name',
        label: 'Name',
        sortable: true,
        filter: true
      },

      {
        name: 'category',
        label: 'Category',
        sortable: false,
        filter: false,
        width:150,
        renderCell: (params) => {
          return <ul> {params && params.value ? params.value.map(x => <li style={{textAlign:'left'}} key={x.id} value={x.id}>{x.name}</li>) : <></>} </ul>
        }
      },
      {
        name: 'UnitOfMeasure',
        label: 'Unit of measure',
        sortable: false,
        filter: false,
        width:150,
        renderCell: (params) => {
          return <ul > {params && params.value ? params.value.map(x => <li style={{textAlign:'left'}} key={x.id} value={x.id}>{x.name}</li>) : <></>} </ul>
        }
      },
      {
        name: 'addByUserId',
        label: 'Add by user Id',
        sortable: true,
        filter: true,
        valueFormatter: (params) => {
          return `${params.value || 'add by system'}`;
        }
      },
      {
        name: 'Edit',
        label: 'Edit',
        sortable: false,
        filter: false,
        width:100,
        renderCell: (params) => {
          return <BsFillPencilFill
          // onClick={()=>{editIngredients()}}
              style={{ fontSize: 20, marginLeft: '35%'}}
            />
        }
      },
      {
        name: 'delete',
        label: 'Delete',
        sortable: false,
        filter: false,
        width:100,
        renderCell: (params) => {
          return <BsTrash
          style={{ fontSize: 20, marginLeft: '35%' }}
        />
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
      // getTablerows={(values)=>{setRows(values)}}
    />
  )
}
