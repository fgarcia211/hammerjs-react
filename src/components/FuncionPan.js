import React, { Component } from 'react'
//Se importa la libreria de hammerJS y jquery para incluir funcionalidad
import Hammer from 'react-hammerjs'
import $ from 'jquery';

export default class FuncionPan extends Component {

    state = {
        golesIzq: 0,
        golesDcha: 0,
        balonDentro: false,
    }

    //Funcion para mover el balon por el campo y comprobar si se ha realizado un gol
    mueveBalonPan = (e) => {

        //Comprobamos si su centro se encuentra dentro del campo
        //Si lo hace, desplazamos el div del balon
        if ((e.center.y) < 701 && (e.center.y) > 174 && (e.center.x) > 450 && (e.center.x) < 1250){

            //Se resta 50 para que arrastre desde el centro el balon -> 50 = Su height y su width / 2
            $(".cajaBalon").offset({top:e.center.y-50,left:e.center.x-50});

        }

        //Para comprobar si ha marcado gol, comprobamos que la altura de su centro
        //este a la altura de los div de la porteria (altura 150px -> posicioncentro-> 362.5px)

        if (e.center.y-50 > 287.5 && e.center.y-50 < 437.5){

            //Si el gol se produce en las coordenadas de la porteria izquierda, se añadira el gol al lado izquierdo
            //Ademas, para evitar la propagacion del evento, haremos que el state del balonDentro sea true

            if ((e.center.x-50 > 420 && e.center.x-50 < 450) && this.state.balonDentro != true){

                this.state.golesIzq++;
                this.setState({balonDentro: true})

            }

            //Por otro lado, si se produce en las coordenadas de la porteria deerecha, se añadira el gol al lado derecho
            //Tambien haremos que balonDentro sea true para evitar la propagacion del evento

            if ((e.center.x > 1200 && e.center.x < 1230) && this.state.balonDentro != true){

                this.state.golesDcha++;
                this.setState({balonDentro: true})

            }
        }

    }

    //Funcion para reiniciar el balon en caso de que la funcion pan sea finalizada
    reiniciarBalon = () => {
        
        //Ajustamos la posicion inicial del balon en el centro
        $(".cajaBalon").offset({top:362.5,left:800});

        //En caso de que se haya producido un gol, tambien ajustaremos el balonDentro como false para poder marcar nuevamente
        this.setState({
            balonDentro: false
        })
    }
    
    //Funcion que se producira al iniciar el componente
    componentDidMount = () => {

        this.reiniciarBalon();

        //Colocamos los div con las porterias, dentro del campo
        $(".porteizq").offset({top:362.5,left:450});
        $(".portedcha").offset({top:362.5,left:1220});
    }

  render() {
    return (
        <div>
            <div className='py-4 bg-info' style={{"height":"100px"}}>
                <h3 className='text-center'>Prueba de funcion "onPan" y "onPanEnd"</h3>
            </div>
            <div className='bg-success' style={{"height":"525px","width":"800px","marginLeft":"450px"}}>
                <div className='porteizq bg-secondary border border-white' style={{"height":"150px","width":"30px","zIndex":"1"}}></div>
                {/*El Hammer sirve para aplicar la funcionalidad a un grupo de elementos concreto, en este caso solo al balon*/}
                <Hammer onPan={this.mueveBalonPan} onPanEnd={this.reiniciarBalon}>

                    <div id="cajaBalon" className='cajaBalon bg-white text-center' style={{"width":"98px","height":"98px","border":"1px solid black","borderRadius":"50px","zIndex":"0"}}>
                    </div>

                </Hammer>
                <div className='portedcha bg-secondary border border-white' style={{"height":"150px","width":"30px","zIndex":"1"}}></div>
            </div>
            <div className="border border-dark bg-warning" style={{"position":"fixed","height":"525px","top":"175px","width":"300px","left":"100px"}}>
                <h1 className='p-3 bg-dark text-white text-center'>Local</h1>
                <h3 className='text-center p-5' style={{"fontSize":"120px"}}>{this.state.golesIzq}</h3>
            </div>
            <div className="border border-dark bg-warning" style={{"position":"fixed","height":"525px","top":"175px","width":"300px","left":"1300px"}}>
                <h1 className='p-3 bg-dark text-white text-center'>Visitante</h1>
                <h3 className='text-center p-5' style={{"fontSize":"120px"}}>{this.state.golesDcha}</h3>
            </div>
        </div>
      
    )
  }

}
