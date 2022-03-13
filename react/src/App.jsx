import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import React from 'react'
import Home  from './Home.jsx';
import About from './About.jsx';
 
function App() {
  return (
    <Router>
        <Link to='/'>首页</Link>&nbsp;&nbsp;
        <Link to='/about'>关于</Link>
        <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path='/about' exact element={<About/>}/>
        </Routes>
    </Router>
  );
}

export default App;
