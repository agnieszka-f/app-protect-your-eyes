import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
	
  state = {
	status: 'off',
    time: 0,
    timer: null,	
  }
  
  formatTime(){
    let minutes = Math.floor(this.state.time/60);
	let seconds = this.state.time%60;
	
	return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');  
  }
  
  startTimer(){
	this.setState({status: 'work', time: 1200, timer: setInterval(()=>this.step(), 1000), });  
  }
  
  stopTimer(){
	this.setState((state) => ({status: 'off', time: 0, timer: clearInterval(state.timer), }));  
  }
  
  step(){ 
    if(this.state.time > 0) {
	  this.setState((state) => ({time: state.time-1}));
	} else if (this.state.time === 0){
	  this.playBell();
	  this.state.status === 'work' ? this.setState({status: 'rest', time: 20}) : this.setState({status: 'work', time: 1200});
	}
  }
  
  closeApp(){ 
	window.close();  
  }
  
  playBell(){
	let bell = new Audio('./sounds/bell.wav');  
	bell.play();
  }
  
  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
		{ 
		  this.state.status === 'off' ?
            <div><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
                 <p>This app will help you track your time and inform you when its time to rest.</p>
			</div> : '' 
		}
		{ 
		  this.state.status === 'work' ? <img src="./images/work.png" /> : ''
		}
		{ 
		  this.state.status === 'rest' ? <img src="./images/rest.png" /> : ''
		}       
		{ 
		  this.state.status !== 'off' ? <div className="timer"> { this.formatTime() } </div> : ''
		}       
		{ 
		  this.state.status === 'off' ? <button className="btn" onClick={()=>this.startTimer()}>Start</button> : ''
		}
		{ 
		  this.state.status !== 'off' ? <button className="btn" onClick={()=>this.stopTimer()}>Stop</button> : ''
		}        
        
        <button className="btn btn-close" onClick={()=>this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
