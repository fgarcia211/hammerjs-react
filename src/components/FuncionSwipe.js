import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import $ from 'jquery';

export default class FuncionSwipe extends Component {

  //Se declara un state, con el recuadro que esta seleccionado, el numero de divisores que se generaran, y el estilo de cada uno de los divisores creados
  state = {
    style: {
      "width":"33.33%",
      "float":"left",
      "height":"200px",
      "border":"1px solid black",
      "textAlign":"center"
    },
    divisores: ["Cuadro 1","Cuadro 2","Cuadro 3","Cuadro 4","Cuadro 5","Cuadro 6","Cuadro 7","Cuadro 8", "Cuadro 9"],
    seleccion: 0
  }

  //Funcion que se realizara al iniciar el componente
  componentDidMount = () => {

    this.añadeColor();

  }

  //Funcion para determinar la direccion a la que debemos arrastrar el divisor rojo
  deslizaCuadro = (e) => {

    //Borraremos el color rojo del recuadro seleccionado
    this.borraColor();

    //Si el tipo de evento swipe, es a la derecha, entramos aqui
    if (e.type == "swiperight") {

      //Cambiaremos la seleccion de izquierda a derecha, y si estamos en el ultimo divisor, pasaremos al primero
        if (this.state.seleccion == 8){

          this.state.seleccion = 0;

        }else{

          this.state.seleccion = this.state.seleccion + 1
        }
    
    //Si el tipo de evento swipe, es a la izquierda, entramos aqui
    }else if(e.type == "swipeleft"){

        //Cambiaremos la seleccion de derecha a izquierda, y si estamos en el primer divisor, pasaremos al ultimo
        if (this.state.seleccion == 0){

          this.state.seleccion = 8;

        }else{

          this.state.seleccion = this.state.seleccion - 1
        }
    
    //Si el tipo de evento swipe, es hacia arriba, entramos aqui
    }else if(e.type == "swipeup"){

      //Si el divisor seleccionado se encuentra en la fila de arriba, lo bajaremos hasta la posicion mas baja, dentro de su columna.
      //Si no, le restaremos 3 para que su posicion sea una mas arriba, dentro de su columna
      if (this.state.seleccion == 0){

        this.state.seleccion = 6;

      }else if (this.state.seleccion == 1){

        this.state.seleccion = 7;

      }else if (this.state.seleccion == 2){

        this.state.seleccion = 8;

      }else{

        this.state.seleccion = this.state.seleccion - 3;
      }
    
    //Si el tipo de evento swipe, es hacia abajo, entramos aqui
    }else if(e.type == "swipedown"){

      //Si el divisor seleccionado se encuentra en la fila de abajo, lo subiremos hasta la posicion mas alta, dentro de su columna.
      //Si no, le sumamos 3 para que su posicion sea una mas abajo, dentro de su columna
      if (this.state.seleccion == 6){

        this.state.seleccion = 0;

      }else if (this.state.seleccion == 7){

        this.state.seleccion = 1;

      }else if (this.state.seleccion == 8){

        this.state.seleccion = 2;

      }else{

        this.state.seleccion = this.state.seleccion + 3;
      }

    }

    //Le asignamos la seleccion, una vez modificada y llamamos a añadeColor()
    this.setState({
      seleccion: this.state.seleccion
    }); 

    this.añadeColor();

  }

  //Funcion para colorear la introduccion y el recuadro del swipe, del divisor en el que entramos
  añadeColor = () => {

    //El recuadro 7 es de color amarillo, por lo que si no esta en el recuadro 7, al recuadro 7 se le aplicara la clase bg-warning
    //Ademas le añadiremos la clase con bg info para pintarlo de azul clarito, y quitarle el bg warning si lo tuviera, tanto a la introduccion como al recuadro del swipe
    //En caso contrario, se realizaria el mismo procedimiento a la inversa con bg warning y bg info

    if (this.state.seleccion != 7){

      $(".recuadro").children()[7].setAttribute("class","bg-warning");

      $(".divisorInfo,.zonaOperacion").addClass("bg-info");
      $(".divisorInfo,.zonaOperacion").removeClass("bg-warning");

    }else{

      $(".divisorInfo,.zonaOperacion").addClass("bg-warning");
      $(".divisorInfo,.zonaOperacion").removeClass("bg-info text-white");

    }

    //Aplicaremos el mismo procedimiento que con el 7, solo que esta vez sera el numero 2, y ademas, en vez de bg-warning, sera bg-black

    if (this.state.seleccion != 2){

      $(".recuadro").children()[2].setAttribute("class","bg-black");

      $(".divisorInfo,.zonaOperacion").addClass("bg-info");
      $(".divisorInfo,.zonaOperacion").removeClass("bg-dark text-white");

    }else{

      $(".divisorInfo,.zonaOperacion").removeClass("bg-info");
      $(".divisorInfo,.zonaOperacion").addClass("bg-dark text-white");
    }
    
    //Una vez comprobado, al divisor que iremos deslizando, le añadiremos el color rojo con la clase bg-danger al divisor seleccionado
    $(".recuadro").children()[this.state.seleccion].setAttribute("class","bg-danger");

  }

  //Funcion que elimina la clase del divisor que esta seleccionado
  borraColor = () => {

    $(".recuadro").children()[this.state.seleccion].removeAttribute("class");
    
  }

    render() {
      return (
        <div>
          <div className='w-50 py-4 px-4 mt-4 border border-dark bg-info divisorInfo' style={{"marginLeft":"25%"}}>
            <h3 className='text-center'>Prueba de funcion "Swipe"</h3>
            <p className='text-center mt-4'>Usa el divisor de abajo para mover el cuadro rojo. Comprueba que pasa si entras a una casilla de distinto color</p>
          </div>
          <div className="text-center border border-dark recuadro" style={{"width":"50%", "height":"600px" , "marginLeft":"25%"}}>
            {
              this.state.divisores.map((divisor, index) => {
                return(<div key={index} style={this.state.style}></div>)
              })
            }
          </div>
          {/*Para que podamos realizar el SwipeUp y el SwipeDown, hay que configurar las options -> recognizers -> swipe -> enable:true, y ademas, el direction="DIRECTION_ALL"*/}
          {/*Los deslizamientos que hagamos solo funcionaran dentro de este recuadro, ya que es el que tiene la etiqueta Hammer*/}
          <Hammer options={{recognizers:{swipe:{enable:true}}}}direction="DIRECTION_ALL" onSwipeLeft={this.deslizaCuadro} onSwipeRight={this.deslizaCuadro} onSwipeUp={this.deslizaCuadro} onSwipeDown={this.deslizaCuadro}>
            <div className='w-50 py-4 px-4 bg-info text-center justify-content-center border border-dark zonaOperacion' style={{"height":"150px","marginLeft":"25%"}}>
              <h3 className='mt-4'>Desliza aqui para mover el cuadro rojo</h3>
            </div>
          </Hammer>
        </div>
      )
    }
}

