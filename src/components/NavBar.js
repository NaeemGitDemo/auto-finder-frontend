import React from 'react'
import { Link } from 'react-router-dom'
import logo from './img/logo.png'
const NavBar = ({ user }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <Link className="navbar-brand" to="/"> <img src={logo} alt='logo' /> Auto-Finder</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Link</Link>
                        </li>

                    </ul>
                    {user && user.isAdmin && <div>

                        <Link className="btn btn-dark my-2 my-sm-0 m-2" type="button" to='/dashboard'>Dashboard</Link>
                    </div>}
                    {user && <div>
                        <Link className="btn btn-outline-info my-2 my-sm-0 " type="button" to='/profile'>{user.name}</Link>
                        <Link className="btn btn-outline-danger my-2 my-sm-0 m-2" type="button" to='/logout'>Logout</Link>
                    </div>}
                    {!user && <div>
                        <Link className="btn btn-outline-secondary my-2 my-sm-0 " type="button" to='/register/new'>Register</Link>
                        <Link className="btn btn-outline-success my-2 my-sm-0 m-2" type="button" to='/login'>Login</Link>
                    </div>}


                </div>
            </nav>
        </div>
    )
}


export default NavBar