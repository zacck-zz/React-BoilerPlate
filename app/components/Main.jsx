import React, {Component} from 'react'
//components we need in this Component
class Main extends Component{
  render(){
    return (
      <div>
          <div className="row">
            <div style={{textAlign: 'center'}}>
              {/*render children here*/}
              <p>You are in the app shell</p>
            </div>
          </div>
      </div>
    );
  }
}

export default Main;
