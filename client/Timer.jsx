Timer = React.createClass({
  componentWillUnmount: function() { // clear timer
    clearInterval(this.state.timer);
    // this.setState({timer: undefined});
  },
  getInitialState: function(){
    var elapsed =  this.props.timer.diff;
    if (this.props.timer.isStart){
      elapsed += Date.now() - this.props.timer.start;
    }
    if (this.props.timer.isStart){
      this.resume();
    }
    return {elapsed: elapsed, diff: 0, timer: undefined};
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.timer.isStart) {
      this.resume();
    } else {
      this.pause();
      this.setState({elapsed: nextProps.timer.diff, diff: nextProps.timer.diff});
    }
  },
  tick: function() {
    var elapsed = Date.now() - this.props.timer.start + this.state.diff;
    this.setState({elapsed: elapsed});
  },
  getTimeSpan: function(elapsed) { // 754567(ms) -> "12:34.567"
    var m = String(Math.floor(elapsed/1000/60)+100).substring(1);
    var s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);
    var ms = String(elapsed % 1000 + 1000).substring(1);
    return m+":"+s+"."+ms;
  },
  resume: function(){
    if (this.state !== undefined && this.state.timer === undefined){
      this.setState({timer: setInterval(this.tick, 16)});
    }
  },
  pause: function(){
    if (this.state.timer !== undefined){
      clearInterval(this.state.timer);
    }
    this.setState({
      timer: undefined,
      diff: this.state.elapsed
    });
  },
  onClick: function() {
    if(!this.props.timer.isStart) { // start
      TimersCollection.update(this.props.timer._id, {
        $set: {
          isStart: true,
          start: new Date()
        }
      });
    } else { 
      TimersCollection.update(this.props.timer._id, {
        $set: {
          isStart: false,
          diff: this.state.elapsed,
        }
      });
    }
  },
  setLap: function() {
    var lapElapsed = this.props.timer.laps.length ? this.props.timer.laps[0].elapsed : 0;
    var lapTitle = "Lap"+(this.props.timer.laps.length+1);
    var lapTime = lapTitle+": "+this.getTimeSpan(this.state.elapsed - lapElapsed);
    var lapElem = { label: lapTime, elapsed: this.state.elapsed, id:lapTitle+this.props.timer._id };
    TimersCollection.update(this.props.timer._id, {
        $set: {laps: [lapElem].concat(this.props.timer.laps)}
      });
  },
  reset: function() {
    clearInterval(this.state.timer);
    this.setState({timer: undefined, elapsed: 0, diff: 0});
    TimersCollection.update(this.props.timer._id, {
        $set: {
          isStart: false,
          elapsed: 0,
          diff: 0,
          laps: []
        }
      });
  },
  render: function() {
    return (
      <div>
        <h1>{this.getTimeSpan(this.state.elapsed)}</h1>
        <button onClick={this.onClick} style={style.button}>
          {this.props.timer.isStart ? "pause" : "start"}
        </button>
        <button onClick={this.setLap} style={style.button}>lap</button>
        <button onClick={this.reset} style={style.button}>reset</button>
        <ul style={style.lap}>
          {this.props.timer.laps.map(function(lap) {
            return <li key={lap.id}>{lap.label}</li>;
          })}
        </ul>
      </div>
    );
  }
});

var style = {
  button: {
    fontSize: 20,
    height: 44,
    width: 88,
    margin: 5,
  },
  lap: {
    fontSize: 28,
    padding: 5,
    listStyleType: 'none',
  }
};