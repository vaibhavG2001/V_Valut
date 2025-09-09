import React, { useEffect, useState } from 'react'
import UsecustomHook from './customehook'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

export default function Registration() {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    let { state, dispatch } = UsecustomHook()

    let navigate = useNavigate()

    let [registerReply, functionRegister] = useState('')
    async function registerbtn() {
        try {
            let sendregisterElement = await axios.post("http://localhost:5000/registration", state, { withCredentials: true })

            if (sendregisterElement.status == 200) {
                navigate("/login")
            }
        }
        catch (err) {
            functionRegister(err.response.data)


            setTimeout(() => {
                functionRegister('')
            }, 1200);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div>
                <div className="container regis">

                    <div className="mb-3 inp" >
                        <label htmlFor="exampleFormControlInput1" className="form-label" > Name</label>
                        <input type="text" className="form-control" onChange={(e) => dispatch({ type: "name", value: e.target.value })} id="exampleFormControlInput1" />
                    </div>

                    <div className="mb-3 inp" >
                        <label htmlFor="exampleFormControlInput1" className="form-label"> Email</label>
                        <input type="email" className="form-control" onChange={(e) => dispatch({ type: "email", value: e.target.value })} id="exampleFormControlInput1" />
                    </div>

                    <div className="mb-3 inp" >
                        <label htmlFor="exampleFormControlInput1" className="form-label"> Contact</label>
                        <input type="number" className="form-control" onChange={(e) => dispatch({ type: "number", value: e.target.value })} id="exampleFormControlInput1" />
                    </div>

                    <div className="mb-3 inp" >
                        <label htmlFor="exampleFormControlInput1" className="form-label"> Age</label>
                        <input type="number" className="form-control" onChange={(e) => dispatch({ type: "age", value: e.target.value })} id="exampleFormControlInput1" />
                    </div>

                    <div className="mb-3 inp" >
                        <label htmlFor="exampleFormControlInput1" className="form-label">Create Password</label>
                        <input type="string" className="form-control" onChange={(e) => dispatch({ type: "password", value: e.target.value })} id="exampleFormControlInput1" />
                    </div>

                    <p>{registerReply}</p>
                    <button className="shadow__btn" onClick={registerbtn}>
                        Submit
                    </button>
                </div>
            </div>

            


        </motion.div>
    )
}
