// import { prettyDOM } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import { Button, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CartState } from '../context/Context';
import Rating from './Rating';

const Cart = () => {
  const [total, setTotal] = useState(0);
  const {state: {cart}, dispatch} = CartState();

  useEffect(() => {
    const sum = cart.reduce((accumulator, current) => accumulator + Number(current.price) * current.qty ,0)
    setTotal(sum);
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{item.name}</span>
                </Col>
                <Col md={2}>
                  <span>$ {item.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={item.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: item.id,
                          qty: e.target.value
                        }
                      })
                    }
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">SubTotal {cart.lenght} items </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total : $ {total}</span>
      </div>
    </div>
  );
}

export default Cart