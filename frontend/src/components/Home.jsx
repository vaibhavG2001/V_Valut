import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function Home() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    let navigate = useNavigate()
    function go_to_register_page() {
        navigate("/registration")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div data-aos="fade-up">
                <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ height: "80vh", objectFit: "cover" }} class="d-block w-100 " alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ height: "80vh", objectFit: "cover" }} class="d-block w-100 " alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ height: "80vh", objectFit: "cover" }} class="d-block w-100 " alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>


                <h1 className="text-center my-4">Our Technology</h1>


                <div className="text-center spin">
                    <div class="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div className="container" data-aos="fade-up">
                    <div class="container text-center" data-aos="fade-up">
                        <div class="row" data-aos="fade-up">

                            <div class="col" data-aos="fade-up">
                                <h1 className='my-4 ' data-aos="fade-up">What is V_Vault?</h1>
                                V_Vault is your personal digital safe — a secure and private place where you can store all your important documents, files, and memories without worrying about unauthorized access. Every piece of information inside V_Vault is guarded with full privacy and strong encryption, so you can trust that what you keep here, stays here.
                            </div>


                            <div class="col" data-aos="fade-up">
                                <h1 className='my-4 '>How we keep you Secure</h1>
                                We use JWT (JSON Web Tokens) for authentication combined with encrypted cookies to make sure only you have access to your account. Your sessions are handled safely, preventing unauthorized logins and giving you a smooth and reliable experience. Our approach ensures that your data is not only protected at the moment of login but also remains secure every time you interact with the system.

                                Your files are stored with end-to-end protection, which means no third party — not even us — can peek into your private vault. From upload to download, everything is wrapped in a layer of security.
                            </div>


                            <div class="col" data-aos="fade-up">
                                <h1 className="my-4">Simple, Fast, and Organized</h1>
                                Security doesn’t have to be complicated. V_Vault comes with a clean and intuitive dashboard where you can upload, manage, and organize your files in seconds. No unnecessary steps, no confusing options — just a space built for speed and simplicity.
                            </div>


                        </div>
                    </div>


                    <h1 data-aos="fade-up">Why Choose V_Vault?</h1>


                    <div class="card text-bg-dark" data-aos="fade-up">
                        <img src="https://images.unsplash.com/photo-1542185400-f1c993ecbea2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h1 className='my-4 head'>
                                Maximum Security → End-to-end encryption, JWT authentication, and safe cookies
                            </h1>

                            <h1 className='my-4 head'>
                                Peace of Mind → Your vault is yours alone; nobody else can access it.
                            </h1>

                            <h1 className='my-4 head'>
                                Modern Tech → Built with React, Node.js, Express, and MongoDB for reliability and scalability.
                            </h1>

                            <h1 className='my-4 head'>
                                User-First Design → Clean, simple, and efficient — built for people, not for complexity.
                            </h1>

                            <h1 className='my-4 head'>
                                Future Ready → Structured to grow with your needs, whether personal or professional.
                            </h1>

                        </div>
                    </div>

                </div>






            </div>



            <div className="redirect my-4 text-center" data-aos="fade-up" >
                <h1 data-aos="fade-up" style={{ marginTop: "7rem" }}>We are only for you.</h1>

                <button class="btn" onClick={go_to_register_page}>
                    Register
                </button>
            </div>
        </motion.div>
    )
}
