import React from "react";

// ! libraries
import {Link} from 'react-router-dom';

// !styles import
import { FaShoppingCart } from "react-icons/fa";

import {
  Container,
  FormControl,
  Nav,
  Navbar,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {

    const {state: {cart}, dispatch, productDispatch} = CartState();

  return (
    <div className="header">
      <Navbar
        className="navBar"
        bg="dark"
        variant="dark"
        style={{ height: 80 }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">#WeirdLife</Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="Search a product"
              className="m-auto"
              onChange={(e) =>
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            />
          </Navbar.Text>
          <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge>{cart.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenu">
                {cart.length > 0 ? (
                  <>
                    {cart.map((item) => (
                      <span className="cartItem" key={item.id}>
                        <img
                          src={item.image}
                          className="cartItemImg"
                          alt={item.className}
                        />

                        <div className="cartItemDetail">
                          <span>{item.name}</span>
                          <span>$ {item.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            })
                          }
                        />
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div></div>
                )}

                <span style={{ padding: 10 }}>Cart is Epmty</span>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
