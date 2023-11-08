import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct.jsx';
import AddToCart from './AddToCart.jsx';

const ProductGrid = ({cart, setCart, email}) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name:'', price: '', width: '', diameter: '', aspectRatio: '' });

  const addProduct = async () => {
    const response = await fetch('/product/tires', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({ name:'', price: '', width: '', diameter: '', aspectRatio: '' });
  };

  const removeProduct = async (id) => {
    await fetch(`/product/tires/${id}`, {
      method: 'DELETE',
    });
    const updatedTires = products.filter((tire) => tire._id !== id);
    setProducts(updatedTires);
  };

  const fetchProduct = async () => {
    fetch('/product/tires', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    })
      .then(async (res) => {
        const data = await res.json();
        setProducts(data);
      })
      .catch(() => {
        setProducts([]);
      });
  }

  useEffect(async () => {
    await fetchProduct();
  }, []);

  return (
    <div className='productDisplay'>
      <h1>Tire Store</h1>
      <AddProduct newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} />
      <ul className='gridContainer'>
        {products.map((product) => (
          <li className='item' key={product._id}>
            Name: {product.name} -- {product.width}/{product.aspectRatio}R{product.diameter} - ${product.price}{' '}
            <button onClick={() => removeProduct(product._id)}>Delete</button>
            <AddToCart product_id={product._id} email={email} cart={cart} setCart={setCart}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductGrid;