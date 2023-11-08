import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct.jsx';
import AddToCart from './AddToCart.jsx';
import Pagination from './Pagination.jsx';

const ProductGrid = ({cart, setCart, email}) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name:'', price: '', width: '', diameter: '', aspectRatio: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 20;
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
    fetch(`/product/tires?sort=${sortOption}&order=${sortDirection}`, {
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

  useEffect( () => {
     fetchProduct();
  }, [sortOption, sortDirection, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='productDisplay'>
      <h1>Tire Store</h1>
      <AddProduct newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} />
      <div className='sortButtons'>
        <button onClick={() => setSortOption('diameter')}>Sort by Diameter</button>
        <button onClick={() => setSortOption('width')}>Sort by Width</button>
        <button onClick={() => setSortOption('name')}>Sort by Name</button>
        <button onClick={() => setSortOption('price')}>Sort by Price</button>
        <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          {sortDirection === 'asc' ? 'Descending Order' : 'Ascending Order'}
        </button>
      </div>
      <ul className='gridContainer'>
        {currentProducts.map((product) => (
          <li className='item' key={product._id}>
            Name: {product.name} -- {product.width}/{product.aspectRatio}R{product.diameter} - ${product.price}{' '}
            <button onClick={() => removeProduct(product._id)}>Delete</button>
            <AddToCart product_id={product._id} email={email} cart={cart} setCart={setCart}/>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={products.length} paginate={paginate} />
    </div>
  );
};

export default ProductGrid;