import { useState } from 'react';

import Modal from 'react-modal';

import { GiInfo, GiCash, GiBank, GiHelp } from "react-icons/gi";

import { useHistory } from 'react-router-dom';

const Banking = () => {

    const history = useHistory();

    const [Deposite_Amount, setDeposite_Amount] = useState('');

    const [Withdrawal_Amount, setWithdrawal_Amount] = useState('');

    const [Table_Hidden, setTable_Hidden] = useState(false);

    const [Modal_open, setModal_open] = useState(false);

    const [Banking_empty, setBanking_empty] = useState(false);

    const [Trans_type, setTrans_type] = useState(false);

    const [Histroy,setHistroy] = useState(false);

    const [DEposite_time, setDEposite_time] = useState('');

    const [Withdrawal_time, setWithdrawal_time] = useState('');

    let Balance_Desposite = '';

    let Balance_Withdrawal = '';

    const [Transaction_Status, setTransaction_Status] = useState([Previous_transaction_status]);

    let Previous_transaction_status = '';

    let Transaction_current_status = [];

    const Username = (localStorage.getItem('Login_User'));

    const Deposite_amount = () => {   
        debugger;                                                        //Deposite the Transaction_Status Amount an LOcalstorage

        if (Deposite_Amount != "") {                                                                    //check the amount fiels is empty

            Balance_Desposite = parseInt(localStorage.getItem(Username)) + parseInt(Deposite_Amount);

            localStorage.setItem(Username, Balance_Desposite);

            let time = new Date().toLocaleTimeString();                                         // egt the deposite time to disaply the Transaction_Status transaction status

            setTable_Hidden(true);

            setTrans_type(false);

            setDEposite_time(time);

            let insert_cells = document.getElementById('Table_data').insertRow(0);

            let user_cell = insert_cells.insertCell(0);

            let Deposite_amount_cell = insert_cells.insertCell(1);

            let deposite_time_cell = insert_cells.insertCell(2);

            let Current_balance_cell = insert_cells.insertCell(3);

            user_cell.innerHTML = "Deposite";

            Deposite_amount_cell.innerHTML = Deposite_Amount;

            deposite_time_cell.innerHTML = time;

            Current_balance_cell.innerHTML = localStorage.getItem(Username);

            let cellength = (document.getElementById("Table_data").rows[0].cells.length);

            for (let i = 0; i < cellength; i++) {

                Transaction_current_status[i] = (document.getElementById("Table_data").rows[0].cells.item(i).innerHTML);

            }

            let Final_Trans_status = Object.assign({}, Transaction_current_status);

            if (Final_Trans_status in Transaction_Status) {

                console.log("Your already have been transacted")

            }
            else {
                setTransaction_Status(Transaction_Status => [Final_Trans_status, ...Transaction_Status])

            }

            let User_transaction = JSON.stringify(Transaction_Status);

            sessionStorage.setItem(Username, User_transaction);

        } else {

            setModal_open(true);

        }

        console.log(Transaction_Status);
    }

    const Withdrawal_amount = () => {                                                               //Withdrwal the Transaction_Status Amount an LOcalstoarge

        if (Withdrawal_Amount != "") {                                                              // chcek the amount field is empty

            Balance_Withdrawal = parseInt(localStorage.getItem(Username)) - parseInt(Withdrawal_Amount);

            if (Balance_Withdrawal < 0) {                                                           //chcek the amount is enough to acheive the transaction

                setBanking_empty(true);

            }

            else {

                localStorage.setItem(Username, Balance_Withdrawal);

            }

            let time = new Date().toLocaleTimeString();                                             //get the withdrawal time to disaply transaction status

            setTable_Hidden(true);

            setWithdrawal_time(time);

            let insert_cells = document.getElementById('Table_data').insertRow(0);

            let user_cell = insert_cells.insertCell(0);

            let Withdarwal_amount_cell = insert_cells.insertCell(1);

            let Withdarwal_time_cell = insert_cells.insertCell(2);

            let Current_balance_cell = insert_cells.insertCell(3);

            user_cell.innerHTML = "WithDrawal";

            Withdarwal_amount_cell.innerHTML = Withdrawal_Amount;

            Withdarwal_time_cell.innerHTML = time;

            Current_balance_cell.innerHTML = localStorage.getItem(Username);

            let cellength = (document.getElementById("Table_data").rows[0].cells.length);

            for (let i = 0; i < cellength; i++) {

                Transaction_current_status[i] = (document.getElementById("Table_data").rows[0].cells.item(i).innerHTML);

            }

            let Final_Trans_status = Object.assign({}, Transaction_current_status);

            if (Final_Trans_status in Transaction_Status) {

                console.log("Your already have been transacted")

            }
            else {
                setTransaction_Status(Transaction_Status => [Final_Trans_status, ...Transaction_Status])

            }

            let User_transaction = JSON.stringify(Transaction_Status);

            sessionStorage.setItem(Username, User_transaction);


        } else {

            setModal_open(true);

        }
        setTrans_type(true);

    }

    const Logout = () => {

        history.push(`/`);

    }

    const Table = <table id="Table_data">

        <thead>

            <th>Transaction_type</th>

            <th>Amount</th>

            <th>Time</th>

            <th>current_balance</th>

        </thead>

        <tbody >

            <tr>

                {Trans_type ? <td><b>Withdrawal</b></td> : <td><b>Deposite</b></td>}

                {Trans_type ? <td>{Withdrawal_Amount}</td> : <td>{Deposite_Amount}</td>}

                {Trans_type ? <td>{Withdrawal_time}</td> : <td>{DEposite_time}</td>}

                <td>{localStorage.getItem(Username)}</td>

            </tr>
        </tbody>

    </table>

const Histroy_table = <table id="histroy_Table_data">

<thead>

    <th>Transaction_type</th>

    <th>Amount</th>

    <th>Time</th>

    <th>current_balance</th>

</thead>

<tbody >


</tbody>

</table>

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

    const Update = () => {

        setHistroy(true);

        for (let i = 0; i < Transaction_Status.length; i++) {
            
            let insert_cells = document.getElementById('histroy_Table_data').insertRow(i);

            let user_cell = insert_cells.insertCell(0);

            let Withdarwal_amount_cell = insert_cells.insertCell(1);

            let Withdarwal_time_cell = insert_cells.insertCell(2);

            let Current_balance_cell = insert_cells.insertCell(3);

            user_cell.innerHTML = Transaction_Status[i][0];

            Withdarwal_amount_cell.innerHTML = Transaction_Status[i][1];

            Withdarwal_time_cell.innerHTML = Transaction_Status[i][2];

            Current_balance_cell.innerHTML = Transaction_Status[i][3];

     

        }
        
    }

    window.onload = myFunction => {

        let Get_transaction = sessionStorage.getItem(Username);

        Previous_transaction_status = JSON.parse(Get_transaction);

        setTransaction_Status(Transaction_Status => Previous_transaction_status, ...Transaction_Status)

    }

    return (

        <div>

            <center>

                <div className="container">

                    <br />

                    <div className="display_style">

                        <p><b>  <GiBank style={{ color: 'white', fontSize: '6pc' }} />  </b></p>

                        <input type="number" onChange={(e) => setDeposite_Amount(e.target.value)} className="input_style" placeholder="Enter Deposite Amount.." />

                        <button className="button_style" onClick={() => Deposite_amount()}>DEPOSITE</button>

                        <Modal isOpen={Modal_open}

                            ariaHideApp={false}

                            style={{ content: Content_style }} >

                            <div><GiInfo style={{ color: 'green', fontSize: '3pc' }} />&nbsp;<h3>Authendication ERROR</h3><hr /><p><b>Hi..{Username},</b><br />Please Enter Your Transaction Amount ...</p></div>

                            <button onClick={() => setModal_open(false)}>close</button>

                        </Modal>

                        <Modal isOpen={Banking_empty}

                            ariaHideApp={false}

                            style={{ content: Content_style }} >

                            <div><GiHelp style={{ color: 'red', fontSize: '3pc' }} />&nbsp;<h3>Authendication ERROR</h3><hr /><p><b>Hi..{Username},</b><br />Yours Account have a Rs..<b>{localStorage.getItem(Username)}</b>/- ..Only please Withdrawal minimum amount of transaction  ...</p></div>

                            <button onClick={() => setBanking_empty(false)}>close</button>

                        </Modal>

                    </div>

                    <br />

                    <br />

                    <div className="display_style">

                        <p><b>  <GiCash style={{ color: 'white', fontSize: '6pc' }} /></b> </p>

                        <input type="number" onChange={(e) => setWithdrawal_Amount(e.target.value)} className="input_style" placeholder="Enter Withdrawal Amount.." />

                        <button className="button_style" onClick={() => Withdrawal_amount()}>WITHDRAWAL</button>

                    </div>

                    <br />

                    <br />

                    <div className="display_style_status">

                        <p><b>Transaction_Status</b></p>

                        {Table_Hidden ? Table : ""}

                        {Histroy ? Histroy_table:""}

                    </div>

                    <button className="button_out" onClick={() => Update()}>HISTROY</button>

                   &nbsp;  &nbsp;

                    <button className="button_out" onClick={() => Logout()}>LOGOUT</button>

                </div>

            </center>

        </div>
    );
}
export default Banking;