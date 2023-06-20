import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-primary">
        <ul className="navbar-nav">
                <li className="nav-item"><Link to='/' className='nav-link'><h1>MOVIES APP</h1></Link></li>
                <li className="nav-item mx-4 my-auto"><Link to='/favourites' target='_blank'  className='nav-link'><h3>Favourites</h3></Link></li>
            </ul>
      </nav>
    )
  }
}
