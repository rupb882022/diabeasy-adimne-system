import React, { useEffect, useState } from 'react'
import FoodTable from './FoodTable'
import { Get_all_food, Get_all_categories, Get_all_unit } from '../../Functions/Api'
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';

export default function Food() {
  const [isRecipe, setIsRecipe] = useState()
  const [data, setData] = useState();
  const [buttonState, setButtonState] = useState();
  const [categoryList, setCategoryList] = useState()
  const [unitList, setUnitList] = useState()

  useEffect(() => {
    Get_all_food(isRecipe ? 'getRecipes' : 'getIngredients').then((respone) => {
      console.log("respone", respone)
      if (respone.status == 200) {
        setData(respone.data)
      } else {
        throw new Error();
      }
    }, (error) => {
      console.log("error in function Get_all_food", error)
    })
  }, [isRecipe])

  useEffect(() => {
    if ((buttonState === "AddCategory"||buttonState==="deleteCategory") && !categoryList) {
      Get_all_categories().then((respone) => {
        if (respone.status == 200) {
          setCategoryList(respone.data)
        } else {
          throw new Error();
        }
      }, (error) => {
        console.log("error in Get_all_categories ", error)

      })
    } else if ((buttonState === "AddUnit"||buttonState==="deleteUnit") && !unitList) {
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

  }

  return (<Container>
    <h1>food system</h1>
    <Row>
      <Col style={{ textAlign: 'left' }} md={1}><Button variant={isRecipe ? "secondary" : "primary"} onClick={() => { setIsRecipe(false) }}>Ingredients</Button></Col>
      <Col style={{ textAlign: 'left'}} md={2}><Button variant={isRecipe ? "primary" : "secondary"} onClick={() => { setIsRecipe(true) }}>Recipes</Button></Col>
      <Col style={{ textAlign: 'end'  }} md={2}><Button variant={buttonState == "AddCategory" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("AddCategory") }}>Add category</Button></Col>
      <Col style={{ textAlign: 'initial' }} md={3}><Button variant={buttonState == "AddUnit" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("AddUnit") }}>Add unit of measure</Button></Col>
      <Col style={{ textAlign: 'end' }} md={2}><Button variant={buttonState == "deleteCategory" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("deleteCategory") }}>Delete category</Button></Col>
      <Col style={{ textAlign: 'initial' }} md={2}><Button variant={buttonState == "deleteUnit" ? "primary" : "secondary"} onClick={() => { handel_header_button_click("deleteUnit") }}>Delete unit of measure</Button></Col>
    </Row>
    {buttonState == "AddCategory" && <Row>
      <Col>
        <Row style={{ padding: '2% 1%' }}>
        <Col md={2}> <Form.Label style={{paddingTop:'3%'}} htmlFor="newunit">Write new category:</Form.Label></Col>
          <Col md={9}>
            <Form.Control
              type="text"
              id="newCategory"
              aria-describedby="listCategory"
            />
          </Col>
          <Col md={1}>
            <Button>set</Button>
          </Col>
        </Row>
        <Form.Text id="listCategory" muted>
          {categoryList && <><p style={{ height: 10 }}>all exist category:</p>
            <ul style={{ display: 'flex', overflowX: 'auto', padding: '0px 2%' }}>{categoryList.map(x => <ol>{x.name}</ol>)}</ul>
          </>}
        </Form.Text>
      </Col>
    </Row>
    }

    {buttonState == "AddUnit" && <Row>
      <Col>
        <Row style={{ padding: '2% 1%' }}>
          <Col md={2}> <Form.Label style={{paddingTop:'3%'}} htmlFor="newunit">Write new unit:</Form.Label></Col>
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
    }
{buttonState == "deleteCategory" && <Row style={{padding:'2% 1%'}}>
{categoryList&&<><Col md={10}><Form.Select>{categoryList.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)}</Form.Select></Col>
<Col md={2}><Button variant='danger'>delete</Button></Col></>}
</Row>
}
{buttonState == "deleteUnit" && <Row style={{padding:'2% 1%'}}>
{categoryList&&<><Col md={10}><Form.Select>{unitList.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)}</Form.Select></Col>
<Col md={2}><Button variant='danger'>delete</Button></Col></>}
</Row>
}
    <div style={{ marginTop: '3%' }}>
      {data && <FoodTable
        data={data}
        isRecipe={isRecipe}
      />}
    </div>
  </Container>
  )
}
