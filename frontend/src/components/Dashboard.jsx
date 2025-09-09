import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let navigate = useNavigate()



    let [DashboardData, functionDashboardData] = useState('')


    let [url, functionUrl] = useState('')
    async function sendfileToDashboard(e) {
        try {

            let data = e.target.files[0]
            let mainContainer = new FormData()
            mainContainer.append("file", data)

            let request = await axios.post("http://localhost:5000/dashboard", mainContainer, { withCredentials: true })

            functionUrl(request.data.public_id)
            functionDashboardData(request.data.imgArray)
            console.log(request)
        }

        catch (err) {
            alert(err.response.data)

            console.log("dashboard error", err)
        }
    }



    let [WelcomeName, functionWelcomeName] = useState('')
    useEffect(() => {
        function showcards() {
            let send = axios.get("http://localhost:5000/showcards", { withCredentials: true }).then((data) => {
                // console.log(data)
                functionDashboardData(data.data.imgarray)
                functionWelcomeName(data.data.name)

            }).catch((err) => {
                // console.log("sendNotes Error", err)
            })
        }
        showcards()
    }, [])


    return (
        <>
            <h1 className='text-center my-4'>Welcome {
                WelcomeName.replace(WelcomeName.charAt(0), WelcomeName.charAt(0).toUpperCase())
            }</h1>
            <h2 className='text-center' style={{ color: "cyan" }}>Hide Your Everything here</h2>
            <div className='upperform'>
                <label htmlFor="file" className="custum-file-upload">
                    <div className="icon">
                        <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                    </div>
                    <div className="text">
                        <span>Click to upload image</span>
                    </div>
                    <input id="file" onChange={sendfileToDashboard} type="file" />
                </label>

            </div>

            <div className="my-4 here">
                {DashboardData.length > 0 ? DashboardData.map((element, index) => {
                    const ext = element.split('.').pop().toLowerCase();
                    console.log(ext)
                    if (ext === "png" || ext === "jpg" || ext === "jpeg") {

                        return (
                            <div class="cardhere  text-center">
                                <div class="card2 mx-2">
                                    <a href={`${element}`} download>
                                        <img width={"300vw"} src={`${element}`} alt="" />
                                        <p>Download</p>
                                    </a>
                                </div>
                            </div>
                        )
                    }


                    else {
                        return (
                            <div class="cardhere  text-center">
                                <div class="card2 mx-2">
                                    <video width="300px" controls>
                                        <source src={element} type={`video/${ext}`} />
                                    </video>
                                </div>
                            </div>
                        )
                    }

                }) : 'Nothing to show!'}
            </div>
        </>
    )
}
