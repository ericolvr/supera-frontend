import React, {useState, useEffect} from "react";
import '../App.css';
import {NavLink} from "react-router-dom";


function Navbar() {
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        checkToken()
    }, [])

    function checkToken() {
        const token = localStorage.getItem('user_data')
        if(token) {
            setAuthenticated(token)
        }
    }


    return (
        <nav className="navbar navbar-expand-lg  navbar-white">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Supera Games</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                </div>

                <div className="d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {authenticated? (
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                            </a>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Seus Pedidos</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Sair</a></li>
                            </ul>
                        </li>
                          
                        ) : (
                        <>
                            <li className='nav-item'>
                                <NavLink to='/login' className='nav-link active'>Entrar</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/signup' className='nav-link active'>Criar Conta</NavLink>
                            </li>
                        </>    
                        )}
                        <li className='nav-item'>
                            <NavLink to='/cart' className='nav-link active'>Carrinho</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
