import React, { createContext, useContext, useReducer }  from "react";

// ! imports
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";
 
const Cart = createContext();
// const Product = createContext()

const Context = ({ children }) => {
    const products = [...Array(20)].map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image(),
      inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
      fastDelivery: faker.datatype.boolean(),
      rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }));

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer, {
      byStock: false,
      byFastDelivery: false,
      byRating: 0,
      searchQuery: "",
    })

  return <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>;
};

export default Context;

export const CartState = () => {
    return useContext(Cart);
}

// export const ProductState = () => {
//   return useContext(productReducer)
// }