import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


function CartPage({cart, setCart}) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details for each item in the cart
    fetchCartItems().then(()=>{
      setLoading(false);
    });
  }, [cart]);
  const fetchCartItems = async () => {
    const itemsWithDetails = [];

    for (let item of cart) {
      const response = await fetch(`/product/tires/${item[0]}`); // Assuming you have an API endpoint to fetch product details by ID
      const product = await response.json();
      if (product) itemsWithDetails.push({...product, quantity: item[1]});
    }

    // Calculate total price
    const total = itemsWithDetails.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalPrice(total);
    setCartItems(itemsWithDetails);
  };
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="cart">
      {loading && <div>Loading...</div>} {/* Show loading label */}
      {!loading && cartItems.length > 0 && (
        <div>
          <ul>
            {cartItems.map((product) => (
              <li key={product._id}>
                Name: {product.name} -- {product.width}/{product.aspectRatio}R{product.diameter} -
                ${product.price} (Quantity: {product.quantity})
              </li>
            ))}
          </ul>
          <div>Total Price: ${totalPrice.toFixed(2)}</div>
        </div>
      )}
      {!loading && cartItems.length === 0 && <div>No items in the cart.</div>}
      <button onClick={handleClose}>Close</button>
    </div>

  );
}

export default CartPage;

