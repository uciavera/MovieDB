import React, { useState } from 'react'
import Modal from 'react-modal'
import MainLogo from "../source/mainLogo.png";
import './login.css'

function Login() {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    
    return (
        <div>
            <span onClick={() => setmodalIsOpen(true)}>Sign In</span>
            <Modal className='modalLogin' isOpen={modalIsOpen}
                onRequestClose={() => setmodalIsOpen(false)}
                style={
                    {
                        content: {
                            background: 'white',
                            color: 'black'
                        }
                    }
                }>
                <div className="modalHeader">

                    <div className="imgCard">
                        <img src={MainLogo} alt="fireSpot" />

                    </div>
                    <h4>Glints21</h4>
                </div>
                
                    <div className="modalBody">
                    <label>Full Name</label>
                    <input />
                    <label>Email</label>
                    <input />
                    <label>Password</label>
                    <input />
                    <button>Sign Up</button>
                    <div className="modalBottom">
                        <p>already have an account? </p>
                        <span >Log In</span>
                    </div>
               
                </div>
                
            </Modal>
        </div>
    )
}

export default Login