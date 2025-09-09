import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function EachUser() {
    let location = useLocation()
    let { id } = location.state
    let maindata = location.state.data
    // console.log(location.state.name)


    let navigate = useNavigate()




    async function DeleteUser() {
        let sendDeleteUser = await axios.post("https://v-valut.onrender.com/deleteuser", { id: id })
        if (sendDeleteUser.data.alluser.length>0){
            navigate("/adminarea")
        }
        else if (sendDeleteUser.data.alluser.length == 0) {
            navigate("/registration")
        }

    }





    return (
        <div>
            <h1 className='text-center my-4'>{maindata.length > 0 ? `${location.state.name}'s DATA` : ''}</h1>
            {maindata.length > 0 ? maindata.map((element, index) => {
                console.log(element)
                return (
                    <div class="usercard">
                        <a className='a_here' href={`${element}`}>
                            <p><span>{element}</span></p>
                        </a>
                    </div>
                )
            }) : <p className='text-center ' style={{ marginTop: "19rem" }}>Empty Data</p>}


            <div className="btnarea text-center">
                {
                    <button class="button" onClick={DeleteUser}>
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <div class="front">
                            <span className='span'>Delete User</span>
                        </div>
                    </button>

                       }

            </div>
        </div>
    )
}
