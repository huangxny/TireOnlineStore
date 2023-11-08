import React from 'react';
import AddToCart from './AddToCart.jsx';

const ProductGridContainer = ({ products, removeProduct, email, cart, setCart }) => {
  return (
    <ul className='gridContainer'>
      {products.map((product) => (
        <li className='item' key={product._id}>
          Name: {product.name} -- {product.width}/{product.aspectRatio}R{product.diameter} - ${product.price}{' '}
          <button onClick={() => removeProduct(product._id)}>Delete</button>
          <AddToCart product_id={product._id} email={email} cart={cart} setCart={setCart}/>
        </li>
      ))}
    </ul>
  );
};

export default ProductGridContainer;
