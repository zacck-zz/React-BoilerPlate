import React, {Component, PropTypes} from 'react'
//components we need in this Component
class Main extends Component{
  constructor(props) {
    //always call super as this.props will be undefined
    super(props);
    //initialize state
    this.state = {
      timeLeft: 0,
      message: ''
    };

  };



  componentDidMount() {
    const secs = this.props.seconds
    //this is called directly after the app starts
    //lets reduce the seconds
    this.setState({timeLeft:secs});
    //set up a one second interval
    this.timerID = setInterval(() => this.setState({
      timeLeft: this.state.timeLeft - 1
    }), 1000);
  }


  componentsWillMount(){
  }

  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate(prevProps, prevState){
    //if we are finished counting lets tell our user
    if(prevState.timeLeft == 1) {
      this.setState({
        message: 'Done!!!'
      })
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.timeLeft <= 0) {
      clearInterval(this.timerID);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  //this is what ill be rendered to screen
  render(){
    return (
      <div>
          <div className="row">
            <div style={{textAlign: 'center'}}>
              {/*render children here*/}
              <p>{this.state.timeLeft}</p>
              <p>{this.state.message}</p>
            </div>
          </div>
      </div>
    );
  }
};


//declare default Props expected by app
Main.propTypes =  {
  seconds: PropTypes.number
};

//set our default values
Main.defaultProps = {
  seconds: 0
};

export default Main;
