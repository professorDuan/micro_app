import {HashRouter, Link, Route, Switch} from 'react-router-dom';
import React from 'react'
import Home  from './Home.jsx';
import About from './About.jsx';
 
function App() {
  return (
    <HashRouter>
        <Link to='/'>首页</Link>&nbsp;&nbsp;
        <Link to='/about'>关于</Link>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About} />
        </Switch>
    </HashRouter>
  );
}

export default App;
