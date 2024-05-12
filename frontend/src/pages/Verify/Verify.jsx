/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
          const response = await fetch(url + "/api/order/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ success, orderId })
          });
      
          if (!response.ok) {
            throw new Error('Failed to verify payment');
          }
      
          const responseData = await response.json();
          if (responseData.success) {
            navigate("/myorders");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      };
      

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify