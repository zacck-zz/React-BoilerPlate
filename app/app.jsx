//import react
import React from 'react';
import ReactDOM from 'react-dom';
//ES6 Destructuting syntax
import  {Route, Router, IndexRoute, browserHistory} from 'react-router';
//add components
import Main from 'Main'

//app css require
import 'script-loader!jquery'
import 'script-loader!what-input'
import 'script-loader!foundation-sites'
//require('applicationStyles');

//Create our Router
ReactDOM.render(    //pass two args, JSX and the app element
  <Main seconds={30} sections={1}/>,
  document.getElementById('app') //where to render
);
