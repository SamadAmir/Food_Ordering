import Navbar from "./Components/Navbar/Navbar"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./Components/Footer/Footer"
import { useState } from "react"
import LoginPopup from "./Components/LoginPopUp/LoginPopup"
import Verify from "./pages/Verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrder"

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setshowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setshowLogin={setShowLogin}/>
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/order" element={<PlaceOrder/>}/>
      <Route path="/verify" element={<Verify/>}/>
      <Route path="/myorders" element={<MyOrders/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
