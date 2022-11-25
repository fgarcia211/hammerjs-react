import React, { Component } from 'react'
import Hammer from 'react-hammerjs'
import Jugadores from './../assets/json/jugadores.json'
import $ from 'jquery'

export default class FuncionTapPress extends Component {

    //Se declara el state donde jugaadores, son los jugadores dentro de assets/json, la lista son los jugadores que se han añadido a la lista
    //Y el indice representa el jugador que esta siendo seleccionado

    state = {
        jugadores: Jugadores.jugadores,
        lista: [],
        indice: 0
    }

    //Funcion que esconde o muestra los datos pertenecientes a cada jugador al clickar en el recuadro rojo
    alternaDatos = () => {
        $(".zonadatos").fadeToggle(300);
    }

    //Funcion para cambiar el jugador que se esta mostrando, segun el indice
    cambiaJugador = () => {

        //Si es el ultimo jugador de la lista, se reinicia el indice a 0, sino se le suma 1 al indice actual
        if (this.state.indice == this.state.jugadores.length - 1) {
            this.state.indice = 0;
        }else{
            this.state.indice++;
        }

        //Se asgina el nuevo indice
        this.setState({
            indice: this.state.indice
        })
    }

    //Funcion para añadir a la lista al jugador que esta seleccionado actualmente
    aniadeLista = () => {
        
        //Si el jugador seleccionado no esta en la lista, se le añadira y se asignara la nueva lista
        if (this.state.lista.includes(this.state.jugadores[this.state.indice]) == false){

            this.state.lista.push(this.state.jugadores[this.state.indice]);
            this.setState({
                lista: this.state.lista
            })

        }
        
    }

    //Funcion para eliminar un jugador que se encuentre dentro de la lista
    eliminaJugador = (indice) => {

        //Se elimina un elemento de la lista, desde el indice generado en el map
        this.state.lista.splice(indice,1);

        //Se asigna la nueva lista, con el elemento eliminado
        this.setState({
            lista: this.state.lista
        })
        
    }

    render() {
        return (
        <div>
            <div className='py-4 px-4 mt-4 border border-dark bg-info divisorInfo'>
                <h3 className='text-center'>Prueba de funcion "Tap y Press"</h3>
                <p className='text-center mt-4'>Haz doble click en la imagen para añadir a la lista de jugadores</p>
                <p className='text-center mt-4'>Manten pulsado el click en la carta para cambiar el jugador seleccionado</p>
                <p className='text-center mt-4'>Manten pulsado el click en el jugador de la lista que quieras eliminar</p>
                <p className='text-center mt-4'>Haz click en el cuadrado rojo para ver/ocultar la informacion de cada jugador</p>
            </div>
            <div className="my-4" style={{"float":"left","width":"30%","marginLeft":"10%"}}>
                <div style={{"height":"600px"}}>
                    {/*Hammer donde podremos cambiar el jugador mostrado y añadir a la lista el jugador seleccionado*/}
                    <Hammer onDoubleTap={this.aniadeLista} onPress={this.cambiaJugador}>
                        <div className="cartaUsuario w-100 border border-dark">
                            <div className='zonaimagen' style={{"height":"400px"}}>
                                <img style={{"height":"100%","width":"75%","marginLeft":"12.5%"}} src={this.state.jugadores[this.state.indice].imagen} alt=""/>
                            </div>
                        </div>
                    </Hammer>
                    {/*Hammer para poder dejar los datos como visible/invisible*/}
                    <Hammer onTap={this.alternaDatos}>
                    <div className='bg-danger border border-dark text-white text-center' style={{"width":"100%","height":"200px"}}>
                        <div className="zonadatos">
                            <h5 className='pb-2 pt-4'>Nombre: {this.state.jugadores[this.state.indice].nombre}</h5>
                            <h5 className='py-2'>Posicion: {this.state.jugadores[this.state.indice].posicion}</h5>
                            <h5 className='py-2'>Fecha de nacimiento: {this.state.jugadores[this.state.indice].nacimiento}</h5>
                        </div>
                    </div>
                    </Hammer>
                </div>
            </div>
            <div className="border border-dark my-4" style={{"width":"40%","marginLeft":"50%","height":"600px"}}>
                <table className='text-center table table-dark w-100'>
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th>Pais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*Se crea un hammer por cada jugador que haya dentro de la lista, dando la posibilidad de borrarlo si mantenemos un click en ese jugador*/}
                        {this.state.lista.map((jugador,index)=> {
                            return (<Hammer key={index} onPress={() => this.eliminaJugador(index)}><tr><td>{jugador.nombre}</td><td>{jugador.pais}</td></tr></Hammer>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
