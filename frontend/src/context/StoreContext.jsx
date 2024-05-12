/* eslint-disable react/prop-types */
import { createContext, useState , useEffect } from "react";
import axios from "axios"


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const [token,setToken]=useState("")
  const [food_list,setFoodList] = useState([])

  const url = "http://localhost:4000"

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
  }
  };

  const removeFromCart = async (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  }
  };

 const fetchFoodList = async () => {
  try {
    const response = await fetch(url + "/api/food/list", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    setFoodList(data.data);
  } catch (error) {
    console.error('Error fetching food list:', error);
    // Handle error here, such as setting an error state or showing an error message
  }
};


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount; 
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setcartItems(response.data.cartData);
}
  
  useEffect(()=>{
    async function loadData() {
        await fetchFoodList();
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
    }
    loadData();
},[])


  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
