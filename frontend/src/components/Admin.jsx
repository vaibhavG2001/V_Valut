import React, { useState } from 'react'
import UsecustomHook from './customehook'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Admin() {
    let navigate=useNavigate()
    let { state, dispatch } = UsecustomHook()



    let [backData, functionBackdata] = useState('')
    function admin(e) {
        e.preventDefault()
        dispatch({ type: "btn" })
        let sendAdminData = axios.post("http://localhost:5000/adminlogin", state,{withCredentials:true})
            .then((response) => {
                // console.log(response)
                functionBackdata(response.data)
                if(response.status==200){
                    navigate("/adminarea",{state:{logout:true}})
                }
                setTimeout(() => {
                    functionBackdata('')
                }, 1500);
            })

            .catch((err) => {
                functionBackdata(err.response.data)
                setTimeout(() => {
                    functionBackdata('')
                }, 1500);
                // console.log("admin error", err)
            })

    }

    return (


        <div>
            <h1 className='text-center my-4'>Admin Login!</h1>
            <div class="login-box">
                <form>
                    <div class="user-box">
                        <input type="text" name="" onChange={(e) => dispatch({ type: "email", value: e.target.value })} required="" />
                        <label>Email</label>
                    </div>
                    <div class="user-box">
                        <input type="password" onChange={(e) => dispatch({ type: "password", value: e.target.value })} name="" required="" />
                        <label>Password</label>
                    </div>

                    <div className="msgArea">
                        <p className='text-center' style={{color:"black"}}>{backData}</p>
                    </div>

                    <center>
                        <button onClick={admin}>Login</button>
                    </center>
                </form>
            </div>
        </div>
    )
}
