import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { DataContext } from '../Context';

import firebase from '../../Utils/firebase'
import { Link } from 'react-router-dom';

export const Payment = () => {
    
    const {user, cart, total, resetData} = useContext(DataContext);
    const [confirm, setConfirm] = useState(false)
    
    
      const  sendOrder = (event) => {
            event.preventDefault();
            const form = new FormData(event.target);
            const newDate = new Date().toISOString();
    
            const data = {
                'date': newDate,
                'userID': user.uid,
                'name' : user.displayName,
                'email' : user.email,
                'photoUrl' : user.photoUrl,
                'numberPhone' : form.get('number'),
                'direction' : form.get('direction'),
                'order' : cart,
                'total' : total,
                'completed' : false
            }

            
            firebase.firestore().collection('orders').add(data).then((doc)=>{

                const data2 = {
                    'date': newDate,
                    'userID': user.uid,
                    'name' : user.displayName,
                    'email' : user.email,
                    'photoUrl' : user.photoUrl,
                    'numberPhone' : form.get('number'),
                    'direction' : form.get('direction'),
                    'order' : cart,
                    'total' : total,
                    'completed' : false,
                    'uid' : doc.id
                }

                firebase.firestore().collection('orders').doc(doc.id).set(data2).then((t)=>{
                    setConfirm(true)
                    resetData();
                })
            });
        }

    
        return (
            confirm ?
            <Conten>
                <div className='container'>
                    <h2 style={{textAlign: "center"}}>Gracias por elegirnos, se comunicarán contigo cuando pasen a dejar tu pedido</h2>
                    <div className='btn-container'>
                    <Link to='/'>
                        <button className="btn-confirm" >Seguir comprando</button>
                    </Link> 
                    </div>
                </div>
            </Conten>

            :
            <Conten>
            {
                user ? 
                <>
                <form className='formis' onSubmit={sendOrder}>
                    <h2 style={{textAlign: "center"}}>Ultimos datos para confirmar</h2>
                        <div className='dat'>
                            <input className='inpute' name="direction" placeholder="Dirección"/>
                            <input className='inpute' name="number" placeholder="Número de telefono"/>
                            <button className="btn-confirm" >Confirmar pedido</button>
                        </div>
                    </form>
                </>:
                <div className='container'>
                    <h2 style={{textAlign: "center"}}>Para hacer un pedido debes iniciar sesión</h2>
                    <div className='btn-container'>
                    <Link to='/login'>
                        <button className="btn-confirm" >Iniciar</button>
                    </Link> 
                    </div>
                </div>
            }
            </Conten>
        )

}

const Conten = styled.div`
    .formis{
        display: flex;
        height: 100vh;
        justify-content: center;
        background-color: #2A302C;
        flex-direction: column;
        color: #ffffff;
    }

    .inpute{
        display: flex;
        padding: 10px;
        margin-top: 20px;
        border-radius: 6px;
        width: 300px;
        /* width: 100%; */
    }

    .dat{
        display: block;
        margin: 0 auto;
        align-items: center;
        align-content:center;
        position: relative;
        z-index: 0;
    }

    .container{
        width: 100%;
        display: flex;
        justify-content:center;
        flex-direction: column;
    }

    .btn-container{
        width: 400px;
        margin: 0 auto;
        /* justify-content: center; */
    }

    .btn-confirm{
        /* position: absolute;
        left: 30px; */
        width: 100%;
        height: 40px;
        margin-top: 10px;
        border:none;
        border-radius: 5px;
        color:white;
        font-size: 20px;
        font-weight: 600;
        background-color: black;
    }

    .btn-confirm:hover{
        cursor: pointer;
    }

    .btn-confirm:active{
        transform: translateY(2px);
    }


    @media screen and (max-width: 768px){
        .btn-container{
            width: 200px;
            margin: 0 auto;
            /* justify-content: center; */
        }
    }

`


export default Payment
