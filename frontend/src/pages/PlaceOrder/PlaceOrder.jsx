/* eslint-disable react-hooks/exhaustive-deps */

import "./PlaceOrder.css"
import { useContext,useEffect,useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import { useNavigate } from "react-router"



const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,url,cartItems} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id]
      }));
  
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };
  
    try {
      const response = await fetch(url + "/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      const responseData = await response.json();
      if (responseData.success) {
        const { session_url } = responseData;
        window.location.replace(session_url);
      } else {
        throw new Error(responseData.message || 'Unknown error occurred');
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const navigate = useNavigate();
  useEffect(()=>{
    if (!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  },[token])
  


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input onChange={onChangeHandler} value={data.firstName} required name='firstName' type="text" placeholder='First Name' />
        <input onChange={onChangeHandler} value={data.lastName} required name='lastName' type="text" placeholder='Last Name' />
        </div>
        <input onChange={onChangeHandler} value={data.email} className='emaill' required name='email'  type="email" placeholder='Email address' />
        <input onChange={onChangeHandler} value={data.street} className='streett' required name='street' type="text" placeholder='Street' />
        <div className="multi-fields">
        <input onChange={onChangeHandler} value={data.city} required name='city'  type="text" placeholder='City' />
        <input onChange={onChangeHandler} value={data.city} required name='state'  type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
        <input onChange={onChangeHandler} value={data.zipcode} required name='zipcode'  type="text" placeholder='Zip code' />
        <input onChange={onChangeHandler} value={data.country} required name='country'  type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} value={data.phone} className='phonee' required name='phone'  type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
