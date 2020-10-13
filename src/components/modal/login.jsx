import React, { useState } from 'react';
import Modal from 'react-modal';
import MainLogo from "../source/mainLogo.png";
import './login.css'


function Login() {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [SignUpIsOpen, setSignUpIsOpen] = useState(false);
    const [SignInIsOpen, setSignInIsOpen] = useState(true);

    const [User, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    return (

        <div>
            <h4>{User.email}</h4>
            <div>

                <span onClick={() => {setmodalIsOpen(true); }}
                    style={{ cursor: "pointer" }}>Sign In
                </span>

                <Modal className='modalLogin' isOpen={modalIsOpen}
                    onRequestClose={() => { setmodalIsOpen(false); setSignUpIsOpen(false); setSignInIsOpen(true) }}
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

                    {SignInIsOpen ?
                        <div className="modalBody">
                            <h4>Sign In</h4>

                            <label>User Name</label>
                            <input type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="User Name"
                                value={User.email}
                                onChange={handleChange} />

                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={User.password}
                                onChange={handleChange} />



                            <button onClick={() => {
                                setmodalIsOpen(false);

                            }}>Sign In</button>
                            <div className="modalBottom">
                                <p>don't have an account? </p>
                                <a href="/register" onClick={() => { setmodalIsOpen(false); setSignUpIsOpen(true); setSignInIsOpen(false) }} style={{ cursor: "pointer" }}>Sign Up</a>
                            </div>
                        </div>
                        : null}
                </Modal>
            </div>

        </div>
    );
}

export default Login;