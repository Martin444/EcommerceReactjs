import React, { Component } from 'react'
import Products from './section/Products'
import Details from './section/Details'
import {Route} from "react-router-dom"
import Cart from './section/Cart'
import Payment from './section/Payment'
import Login from './section/login'
import Orders from './section/Orders'


export class Section extends Component {
    render() {
        return (
            <div>
                    <Route path="/" component={Products} exact />
                    <Route path="/ordenes" component={Orders} exact  />
                    <Route path="/product/:id" component={Details} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/confirmar" component={Payment} exact />
                    <Route path="/carrito" component={Cart}  exact/>
            </div>
        )
    }
}

export default Section
