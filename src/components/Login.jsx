import { useState } from 'react';

import Modal from 'react-modal';

import { GiHelp, GiInfo, GiPiggyBank } from "react-icons/gi";

import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const [Username, setUsername] = useState('');

    const [Password, setPassword] = useState('');

    const [Modal_open, setModal_open] = useState(false);

    const New_opener = () => {

        if (Username != "" && Password === Username) {                                  //check the user input is empty or not

            if (Username in localStorage) {                                             //check user is already exist or not

                localStorage.setItem("Login_User", Username);

            }

            else {
                
                localStorage.setItem(Username, 0);

                localStorage.setItem("Login_User", Username);
            }

        }

        else {

            setModal_open(true)

        }

        if (Username != "" && Password != "" && Password === Username) {               //check the

            history.push(`/Banking`);

        }

        else {

            history.push(`/`);

        }


    }

    const Content_style = {

        position: 'absolute',

        top: '30%',

        width: '400px',

        height: '200px',

        left: '38%',

        border: '1px solid #ccc',

        background: '#fff',

        borderRadius: '4px',

        outline: 'none',

        padding: '20px',

        borderRadius: '10px',


    }

    return (

        <div>

            <center>

                <div className="container" >

                    <div className="login">

                        <p><b>Create_user_Account</b></p>

                        <GiPiggyBank style={{ color: 'white', fontSize: '8pc' }} />

                        <input type="text" onChange={(e) => setUsername(e.target.value)} className="input_style" placeholder="Enter UserName.." />

                        <input type="text" onChange={(e) => setPassword(e.target.value)} className="input_style" placeholder="Enter Password.." />

                        <button className="button_style" onClick={() => New_opener()}>LOGIN</button>

                        <Modal isOpen={Modal_open}

                            ariaHideApp={false}

                            style={{ content: Content_style }} >

                            {Username === "" ? <><GiHelp style={{ color: 'red', fontSize: '3pc' }} /> &nbsp;<h3>Authendication ERROR</h3><hr /><p>Please Create Account And afterwarsds login and achieved your transactions</p></> :

                                <><GiInfo style={{ color: 'green', fontSize: '3pc' }} />&nbsp;<h3>Authendication ERROR</h3><hr /><p><b>Hi..{Username},</b>Please Kindly Check Your <b>Username</b> And <b>PassWord</b></p></>}

                            <button onClick={() => setModal_open(false)}>close</button>

                        </Modal>

                    </div>

                </div>

            </center>

        </div>

    );
}
export default Login;