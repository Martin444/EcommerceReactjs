import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import firebase ,{ storage } from '../Utils/firebase'
import { DataContext } from './Context';

export default function FormProduct() {

    const [petPhotom, setPetPhoto] = useState([]);
    const [sendForm, setSendForm] = useState(false);
    const [adminConf, setadminConf] = useState(false);

    const {user} = useContext(DataContext);

    const adminConfirm = () => {
        if(user){
            if(user.admin){
                setadminConf(true)
            } else {
                setadminConf(false)
            }
        } else {
            setadminConf(false)
        }
    }


    useEffect(()=>{
        adminConfirm();
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const newDate = new Date().toISOString();

        const data = {
            'title': form.get('name'),
            'date' : newDate,
            'description': form.get('description'),
            'content': form.get('conten'),
            'price': form.get('price'),
            'src': petPhotom,
            // 'profilePic':props.user.photoURL,
            // 'type': form.get('type'),
            // 'userContact': props.user.email,
            // 'userName': props.user.displayName,
        }

        firebase.firestore().collection('products').add(data).then(data=>{

            const data2 = {
                'title': form.get('name'),
                'date' : newDate,
                'description': form.get('description'),
                'content': form.get('conten'),
                'price': form.get('price'),
                'src': petPhotom,
                'uid': data.id
                // 'profilePic':props.user.photoURL,
                // 'type': form.get('type'),
                // 'userContact': props.user.email,
                // 'userName': props.user.displayName,
            }

            firebase.firestore().collection('products').doc(data.id).set(data2).then((da)=>{

                setSendForm(true)
            })
        })
    }

    const onChange = event => {
        const file = event.target.files[0];
        const storageRef = storage.ref();
        const name = (+new Date()) + '-' + file.name;

        if(file.name){
                const uploadFile = storageRef.child(name).put(file);
                uploadFile
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                    .then(donwloadURL => setPetPhoto(donwloadURL));
                });
                console.log(uploadFile)
        }
      }

    return (
        <DivForm>
            {
                adminConf ?
                    <div className='containerForm'>
                        {
                            sendForm ?
                            <div>
                                <h1>Producto subido con éxito</h1>
                                <button className='btn-load' onClick={()=>{
                                    setSendForm(false)
                                }}>Subir otro</button>
                            </div>
                            :
                            <form onSubmit={handleSubmit}>
                                <input type="file" onChange={onChange} name="photo" className='btn-load'/>
                                <input className='inputer' name="name" type="text" placeholder="Nombre del producto"/>
                                <input className='inputer' name="conten" type="text" placeholder="Breve descripción"/>
                                <input className='inputer' name="description" type="text" placeholder="Descripción detallada"/>
                                <input className='inputer' name="price" type="number" placeholder="Precio"/>
                                <button className='btn-load' >Subir</button>
                            </form>
                        }
                    </div>
                :
                <div className='containerFotm'>
                        <h1>Mirá lo que tenemos para vos</h1>
                </div>
            }
        </DivForm>
    )
}


const DivForm = styled.div`
    width: 100%;
    display: flex;
    /* justify-content: center; */
    padding: 20px;
    
    /* padding: 20px; */
    .containerFotm{
        display: flex;
        width: 100%;
        justify-content: center;
        align-content: center;
        text-align: center;
        margin: auto;

    }
    
    .inputer{
        width: 14%;
        padding: 10px;
        margin: 8px 2px;
        border-radius: 5px;
    }
    
    h1{
        color:white;
    }

    .btn-load{
        padding:10px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        background-color: #67B31B;
        border:none;
        border-radius: 10px;
    }

    .btn-load:hover{
        cursor:pointer;
    }

    .btn-load:active{
        transform: translateY(2px);
    }
 
    @media (max-width: 769px){
        display: block;
        /* justify-content: center; */
        width: 90%;

        h1{
            font-size: 30px;
        }

        .containerForm{
            width: 70%;
            align-self: auto;
            align-content:center;
            display: flex;
            margin: 0 auto;
            background-color:red;
            align-items: center;
        }

        .inputer{
            padding: 15px;
            /* margin: 10px; */
            display: block;
            width: 100%;
            border-radius: 10px;
        }
        
        .btn-load{
            width: 100%;
            color: white;
            font-size: 15px;
            font-weight: 600;
            background-color: #67B31B;
            border:none;
            border-radius: 10px;
            margin: 10px;
        }

    }

`