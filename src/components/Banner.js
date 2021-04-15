import React from 'react'
import styled from 'styled-components'
import ImaBanner from '../Image/banner2.jpg'

export default function Banner() {
    return (
        <Bann>
            <div className='ban-content'>

               <h1 className ='title'>ECO FOOD</h1>
               <h3>Una opción saludable al alcance de tu mano</h3>
            </div>
        </Bann>
    )
}


const Bann = styled.div`
    width: 100%;
    margin: 0;
    height: 80vh;
    background-color: #2A302C;
    text-align: center;
    background-image: linear-gradient(to bottom, rgba(42, 48, 44, 0.20), rgba(42, 48, 44, 0.25)), url(${ImaBanner});
    background-size: cover;
    color: #fff;

    .ban-content{
        margin: 0;
        /* padding:0 auto]; */
        display: block;
        justify-content: center;
        height: 100%;
        padding-top:150px;
    }

    .title{
        text-align:center;
        font-size: 90px;
    }

    h3{
        font-size: 50px;
    }

    @media screen and (max-width: 768px){
        .ban-content{
            margin: 0;
            padding:0 auto;
            display: block;
            justify-content: center;
            height: 100%;
            margin-top:90px;
        }
        .title{
            text-align:center;
            font-size: 50px;
        }

        h3{
            font-size: 30px;
        }
    }

`