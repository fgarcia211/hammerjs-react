import React, { Component } from 'react'

//IMPORTAMOS TODOS LOS COMPONENTES DE LA CARPETA COMPONENTS, Y ADEMAS BROWSERROUTER, ROUTES, ROUTES, Y USEPARAMS, DE REACT-ROUTER-DOM
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import MenuRutas from './components/MenuRutas'
import Home from './components/Home'
import FuncionPan from './components/FuncionPan'
import FuncionSwipe from './components/FuncionSwipe'
import FuncionTapPress from './components/FuncionTapPress'

export default class Router extends Component {

  render() {

    //FUNCION PARA PASAR PARAMETROS AL COMPONENT MUESTRASERIE
    /* function MuestraSerieParam() {

        var { idserie } = useParams();
        return (<MuestraSerie idserie={idserie}/>)

    } */
    
    return (
      <BrowserRouter>
        {/*Añadimos el component MenuRutas para mostrar la barra de navegacion*/}
        <MenuRutas/>
        {/*Añadimos el component Routes para mostrar el contenido de la ruta seleccionada*/}
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pan" element={<FuncionPan/>}/>
            <Route path="/swipe" element={<FuncionSwipe/>}/>
            <Route path="/tap" element={<FuncionTapPress/>}/>
        </Routes>
      </BrowserRouter>
    )
  }

}