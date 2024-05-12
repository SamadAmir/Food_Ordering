import "./Home.css"
import Header from "../../Components/Header/Header"
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu"
import { useState } from "react"
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay"
import AppDownload from "../../Components/MobileAppDownload/AppDownload"
const Home = () => {

  const[category,setCategory]=useState("All")
  return (
    <div className="home">
      <Header></Header>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
