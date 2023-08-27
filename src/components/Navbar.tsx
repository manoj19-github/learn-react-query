import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-main">
        <ul className="navlist">
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/transaction">Transaction</Link>
            </li>
        </ul>

    </div>
  )
}

export default Navbar