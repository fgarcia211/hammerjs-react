import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

//Nav donde guardaremos las distintas rutas a las que podremos acceder (Ver Router.js para consultar rutas)
//Para acceder a cada ruta, deberemos hacer uso de un NavLink

export default class MenuRutas extends Component {
  render() {
    return (
      <div className="border border-dark bg-danger" style={{"height":"73px"}}>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto bg-danger text-center">
                    <li className="nav-item">
                        <NavLink className="nav-link active text-white" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active text-white" aria-current="page" to="/pan">Funcion PAN</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active text-white" aria-current="page" to="/swipe">Funcion SWIPE</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active text-white" aria-current="page" to="/tap">Funcion TAP + PRESS</NavLink>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
      </div>
    )
  }
}
