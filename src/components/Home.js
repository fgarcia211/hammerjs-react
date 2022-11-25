//Este componente muestra el inicio de la pagina, solo incluye una imagen

import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className='text-center bg-dark p-5'>
        <img src="https://i.blogs.es/873061/650_1000_hammerjs/1366_2000.png" className='w-50 img-fluid' alt=""/>
      </div>
    )
  }
}
