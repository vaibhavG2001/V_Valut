import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminArea() {
    let location = useLocation()

    if (location.state != null) {
        let { logout } = location.state
    }

    // console.log(logout)

    let navigate = useNavigate()

    useEffect(() => {
        async function verify() {
            try {
                let check = await axios.get("http://localhost:5000/check", { withCredentials: true })
            }

            catch (err) {
                if (err.response.status == 400) {
                    navigate("/admin")
                }
            }
        }

        verify()
    }, [])



    let [allUserData, functionAllUserData] = useState('')
    useEffect(() => {

        async function adminArea() {
            try {
                let send = await axios.get("http://localhost:5000/adminarea", { withCredentials: true })
                // console.log(send)
                functionAllUserData(send.data.allUser)
            }

            catch (err) {
                console.log("All Data error", err)
            }
        }
        adminArea()

    }, [])




    function EachUser(element) {
        navigate("/eachuser", { state: { data: element.uploadImg, name: element.name, id: element._id } })
    }





// LogoutAdmin///////////////////////////////////////////////////
    async function logoutAdmin(){
        let reques_for_AdminLogout=axios.get("http://localhost:5000/logoutAdmin",{withCredentials:true}).then((api_data)=>{
          
            if(api_data.status==200){
                navigate("/admin")
            }

            
        })
        .catch((err)=>{
            console.log("Error logout",err)   
        })
        // console.log(reques_for_AdminLogout)
    }
// LogoutAdmin///////////////////////////////////////////////////





    return (
        <>
            <h1 className="text-center my-4" style={{ fontFamily: "fantasy", fontSize: "4rem", color: "#5e63ff", textDecoration: "underline" }}>Existing Users</h1>

            {(location.state != null) ?
                <div className="text-center">

                    <button class="button" onClick={logoutAdmin}>
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <div class="front">
                            <span className='span'>Logout</span>
                        </div>
                    </button >

                </div>
                : ''}






            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "6rem", marginTop: "3rem" }}>
                {allUserData.length > 0 ? allUserData.map((element, index) => {
                    let name = element.name.replace(element.name[0], element.name[0].toUpperCase())


                    return (

                        <div class="status-container" >
                            <div class="status" onClick={() => EachUser(element)}>
                                <div class="mac-header" >
                                    <span class="red"></span>
                                    <span class="yellow"></span>
                                    <span class="green"></span>
                                </div>
                                <span>{name}</span>
                                <p>id:{element._id}</p>
                            </div>
                        </div>
                    )

                }) : <p className='text-center ' style={{ marginTop: "13rem" }}>No users! Register First!</p>}

            </div >
        </>
    )
}
