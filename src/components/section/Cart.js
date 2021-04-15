import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;
    
    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;
        if(cart.length === 0){
            return <div className='conten-cart'>
                <h2 style={{textAlign:"center", justifyContent: 'center', color: '#fff', backgroundColor:'#2A302C'}}>No hay productos</h2>
            </div>
        }else{
            return (
                <div className="conten-cart">
                    {
                        cart.map(item =>(
                            // console.log(item)
                            <div className="details cart" key={item.id}>
                                <img src={item.src} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                    {/* <Colors colors={item.colors}/> */}
                                    <p>{item.description}</p>
                                    <p>{item.content}</p>
                                    <div className="amount">
                                       <div>
                                       <button className="count" onClick={() => reduction(item.uid)}> - </button>
                                        <span>{item.quantity}</span>
                                        <button className="count" onClick={() => increase(item.uid)}> + </button>
                                       </div>
                                        <div className="delete" onClick={() => removeProduct(item.uid)}>Eliminar item</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/confirmar">Pedir</Link>
                        <h3>Total: ${total}</h3>
                    </div>
                </div>
                )
            }
        }
}

export default Cart
