import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Banner from '../Banner';
import {DataContext} from '../Context'
import '../css/Products.css'
import FormProduct from '../FormProduct';

export class Products extends Component {

    static contextType = DataContext;


    render() {
        const {products,addCart, userAdmin, removeProductAdmin} = this.context;
        


      

   
        return (
            <div id="product">
            <Banner/>
                <FormProduct/>
               {
                   products.map(product =>(
                       <div className="card" key={product.id}>
                           <Link to={`/product/${product.id}`}>
                               <img src={product.data().src} alt=""/>
                           </Link>
                           <div className="content">
                               <h3>
                                   <Link to={`/product/${product.id}`}>{product.data().title}</Link>
                               </h3>
                               <span>${product.data().price}</span>
                               <p>{product.data().description}</p>
                               {
                                   userAdmin ?
                                    <button onClick={()=> removeProductAdmin(product.data())}>Eliminar producto</button>
                                    :
                                    <button onClick={()=> addCart(product.data())}>Añadir al carrito</button>
                               }
                           </div>
                       </div>
                   ))
               }
            </div>
        )
    }
}

export default Products
