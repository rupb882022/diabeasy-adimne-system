import React, { useEffect, useState } from 'react'
import FoodTable from './FoodTable'
import { Get_all_food, Get_all_categories, Get_all_unit, Delete_food, addCategory, deleteCategory } from '../../Functions/Api'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Loading from '../../Tools/Loading';

export default function Food() {
  const [isRecipe, setIsRecipe] = useState()
  const [data, setData] = useState();
  const [buttonState, setButtonState] = useState();
  const [categoryList, setCategoryList] = useState()
  const [unitList, setUnitList] = useState()
  const [selectedRows, setSelectedRows] = useState([]);

  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState();
console.log("data",data)
  const setTable = async () => {
    await Get_all_food(isRecipe ? 'getRecipes' : 'getIngredients').then((respone) => {
      if (respone.status == 200) {
        setData(respone.data)
      } else {
        throw new Error();
      }
    }, (error) => {
      console.log("error in function Get_all_food", error)
    })
  }

  useEffect(() => {
    setTable();
  }, [isRecipe])

  useEffect(() => {
    if ((buttonState === "AddCategory" || buttonState === "deleteCategory") && !categoryList) {
      Get_all_categories().then((respone) => {
        if (respone.status == 200) {
          setCategoryList(respone.data)
        } else {
          throw new Error();
        }
      }, (error) => {
        console.log("error in Get_all_categories ", error)

      })
    } else if ((buttonState === "AddUnit" || buttonState === "deleteUnit") && !unitList) {
      Get_all_unit().then((respone) => {
        if (respone.status == 200) {
          setUnitList(respone.data)
        } else {
          throw new Error();
        }
      }, (error) => {
        console.log("error in Get_all_unit ", error)

      })
    }

  }, [buttonState])

  const handel_header_button_click = (name) => {
    name === buttonState ? setButtonState('') : setButtonState(name)
    setAlert('')
  }
  const handel_cell_click = async (data) => {
    console.log("data", data)

    switch (data.field) {
      case "delete":
        setLoading(true)
        await deleteRow(data.row['item-id']);
        await setTable()
        setLoading(false)
        break;
      default:
        break;
    }


  }
  const deleteRow = async (foodId) => {
    await Delete_food(isRecipe ? 'Recipe' : 'Ingredient', foodId).then((respone) => {
      if (respone.status === 200) {
        setAlert(
          {
            variant: 'success',
            body: 'row deleted'
          }
        )
      } else {
        throw new Error()
      }
    }, (error) => {
      setAlert({
        variant: 'danger',
        body: 'cennot delete the rows'
      })
      console.log(error + " error in Delete_food")
    })
  }

  const add_Category = async () => {
    try {

      if (selectedRows.length > 0) {
        setLoading(true);
        let categoryId = '';
        let categoryName = '';
        let foodIds = selectedRows.map(x => x['item-id'])
        if (parseInt(category)) {
          categoryId = category;
          categoryName = categoryList.find(x => x.id == category).name
        } else {
          categoryId = -1;
          categoryName = category
        }
        await addCategory(categoryName, categoryId, foodIds).then((respone) => {
          if (respone.status === 201) {
            setAlert({
              variant: 'success',
              body: respone.data + ' rows deleted'
            })
            setTable()
          } else {
            throw new Error();
          }
        }, (error) => {
          console.log(error + " error in addCategory")
        })
      } else {
        setAlert({
          variant: 'warning',
          body: 'you need to select some rows'
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error + " error in add_Category")
    }
    setLoading(false);
  }
  const delete_category = async () => {
    if (selectedRows.length > 0) {
      let foodIds = selectedRows.map(x => x['item-id'])
      deleteCategory(category, foodIds).then((respone) => {
        if (respone.status === 200) {
          setAlert(
            {
              variant: 'success',
              body:respone.data
            }
          )
          setTable();
        } else {
          throw new Error()
        }
      }, (error) => {
        console.log(error + " error in delete_category")
      })
    }
    else {
      setAlert({
        variant: 'warning',
        body: 'you need to select some rows'
      });
    }
  }

  return (<Container>
    <h1>food system</h1>
    <Row>
      <Col style={{ textAlign: 'left' }} md={1}><Button variant={isRecipe ? "secondary" : "primary"} onClick={() => { setIsRecipe(false) }}>Ingredients</Button></Col>
      <Col style={{ textAlign: 'left' }} md={2}><Button variant={isRecipe ? "primary" : "secondary"} onClick={() => { setIsRecipe(true) }}>Recipes</Button></Col>
      <Col style={{ textAlign: 'left' }} md={5}><Button variant={buttonState == "AddCategory" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("AddCategory") }}>Add category</Button></Col>
      {/* <Col style={{ textAlign: 'initial' }} md={3}><Button variant={buttonState == "AddUnit" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("AddUnit") }}>Add unit of measure</Button></Col> */}
      <Col style={{ textAlign: 'left' }} md={3}><Button variant={buttonState == "deleteCategory" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("deleteCategory") }}>Delete category</Button></Col>
      {/* <Col style={{ textAlign: 'initial' }} md={2}><Button variant={buttonState == "deleteUnit" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("deleteUnit") }}>Delete unit of measure</Button></Col> */}
    </Row>
    {buttonState == "AddCategory" && <Row>
      <Col>
        <Row style={{ padding: '2% 1%' }}>
          <Col md={2}> <Form.Label style={{ paddingTop: '3%' }} htmlFor="newunit">Write new category:</Form.Label></Col>
          <Col md={10}>
            <Form.Control
              type="text"
              id="newCategory"
              aria-describedby="listCategory"
              onChange={(e) => { setCategory(e.target.value) }}
            />
          </Col>
        </Row>
        <Row style={{ padding: '2% 1%' }}>
          {categoryList && <>
            <Col md={2}> <Form.Label style={{ paddingTop: '3%' }} htmlFor="newunit">Choose exist category:</Form.Label></Col>
            <Col md={10}><Form.Select
              onChange={(e) => { setCategory(e.target.value) }}
            >{categoryList.map((x, i) => <option value={x.id} key={i}>{x.name}</option>)}</Form.Select></Col>
          </>}
        </Row>
        <Form.Text id="listCategory" muted>
          {categoryList && <><p style={{ height: 10 }}>all exist category:</p>
            <ul style={{ display: 'flex', overflowX: 'auto', padding: '0px 2%' }}>{categoryList.map(x => <ol key={x.id}>{x.name}</ol>)}</ul>
          </>}
        </Form.Text>
      </Col>
      <Row style={{ padding: '0 1% 0 3%' }}>
        <Button
          onClick={() => { add_Category() }}>set</Button>
      </Row>
      <Col>
      </Col>
    </Row>

    }

    {/* {buttonState == "AddUnit" && <Row>
      <Col>
        <Row style={{ padding: '2% 1%' }}>
          <Col md={2}> <Form.Label style={{ paddingTop: '3%' }} htmlFor="newunit">Write new unit:</Form.Label></Col>
          <Col md={9}>
            <Form.Control
              type="text"
              id="newunit"
              aria-describedby="listunitList"
            />
          </Col>
          <Col md={1}>
            <Button>set</Button>
          </Col>
        </Row>
        <Form.Text id="listunitList" muted>
          {unitList && <><p style={{ height: 10 }}>all exist unit:</p>
            <ul style={{ display: 'flex', overflowX: 'auto', padding: '0px 2%' }}>{unitList.map(x => <ol>{x.name}</ol>)}</ul>
          </>}
        </Form.Text>
      </Col>
    </Row>
    } */}
    {buttonState == "deleteCategory" && <Row style={{ padding: '2% 1%' }}>
      {categoryList && <><Col md={10}><Form.Select
        onChange={(e) => { setCategory(e.target.value) }}
      >{categoryList.map((x, i) => <option value={x.id} key={i}>{x.name}</option>)}</Form.Select></Col>
        <Col md={2}><Button variant='danger' onClick={() => { delete_category() }}>delete</Button></Col></>}
    </Row>
    }
    {/* {buttonState == "deleteUnit" && <Row style={{ padding: '2% 1%' }}>
      {categoryList && <><Col md={10}><Form.Select>{unitList.map((x, i) => <option value={x.id} key={i}>{x.name}</option>)}</Form.Select></Col>
        <Col md={2}><Button variant='danger'>delete</Button></Col></>}
    </Row>
    } */}
    <div style={{ marginTop: '3%' }}>
      {loading && <Loading />}
      {data && <FoodTable
        data={data}
        isRecipe={isRecipe}
        getRows={(rows) => { setSelectedRows(rows) }}
        getCellEvent={(data) => { handel_cell_click(data) }}
      />}
    </div>
    {alert &&
      <Alert className='alert' variant={alert && alert.variant ? alert.variant : 'primary'}>
        {alert && alert.body &&
          <p className='alertBody'>
            {alert.body}
          </p>}
      </Alert>}
  </Container>
  )
}
