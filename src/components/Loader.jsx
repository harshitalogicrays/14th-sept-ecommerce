import React from 'react'
import ReactDOM from 'react-dom'
import LoaderImg from '../assets/loader.gif'
import './loader.css'
const Loader = () => {
  return (ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
            <img src={LoaderImg} />
      </div>
    </div>, document.getElementById('loader') )   
  )
}

export default Loader
