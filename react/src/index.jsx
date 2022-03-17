import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import '@babel/polyfill'

function render(){
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  )
}

if (!window.__CUSTOM__MICRO) {
  render()
} 
export const bootstrap = async() => {
  
}

export const mount = async() => {  
  render()
}

export const unmount = async() => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}