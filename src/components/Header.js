import React, { Component } from 'react'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import CartIcon from './svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './css/Header.css'
import {DataContext} from './Context'



export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle: false
    }

    menuToggle = () =>{
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        const {toggle} = this.state;
        const {cart, user} = this.context;
        console.log(user)
        return (
            <header>
                    <div className="menu" onClick={this.menuToggle}>
                        <img src={Menu} alt="" width="20"/>
                    </div>
                    <div className="logo">
                        <h1><Link to="/">Eco food</Link></h1>
                    </div>
                    <nav>
                        <ul className={toggle ? "toggle" : ""}>
                            <li onClick={this.menuToggle}><Link to="/">Inicio</Link></li>
                            <li onClick={this.menuToggle}><Link to="/ordenes">Mis Ordenes</Link></li>
                          
                            {/* <li><Link to="/about">About</Link></li> */}
                            {
                                user ?
                                <li onClick={this.menuToggle}><Link to="/login"><img className='profile' src={user.photoUrl} alt="" width="30"/></Link></li>
                                :
                                <li onClick={this.menuToggle}><Link to="/login">Iniciar</Link></li>
                            }
                            <li className="close" onClick={this.menuToggle}>
                                <img src={Close} alt="" width="20"/>
                            </li>
                        </ul>
                        <div className="nav-cart">
                            <span>{cart.length}</span>
                            <Link to="/carrito">
                                <img src={CartIcon} alt="" width="30" backgroundColor='#67B31B'/>
                            </Link>
                        </div>
                    </nav>
            
            </header>
        )
    }
}



export default Header
