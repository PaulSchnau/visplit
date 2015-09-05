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
    if (!this.state){
      this.setState({timer: setInterval(this.tick, 33)});
    }
    else if (!this.state.timer){
      this.setState({timer: setInterval(this.tick, 33)});
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
  split: function() {
    var splitDuration = this.props.timer.splits.length ? this.props.timer.splits[0].elapsed : 0;
    var id = this.props.timer.splits.length+1;
    var splitTime = this.getTimeSpan(this.state.elapsed - splitDuration);
    var image = 'http://i.imgur.com/egVKTZC.png';
    var splitElem = {
            time: splitTime,
            elapsed: this.state.elapsed,
            id:id+this.props.timer._id,
            name: 'New split',
            image: image
        };

    TimersCollection.update(this.props.timer._id, {
        $set: {splits: [splitElem].concat(this.props.timer.splits)}
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
          splits: []
        }
      });
  },
  render: function() {
    return (
      <div>
        <h1>{this.getTimeSpan(this.state.elapsed)}</h1>
        <div className="btn-toolbar" role="toolbar">
            <button onClick={this.onClick} className="btn btn-primary">
              {this.props.timer.isStart ? "pause" : "start"}
            </button>
            <button onClick={this.split} className="btn btn-primary">split</button>
            <button onClick={this.reset} className="btn btn-danger">reset</button>
        </div>
          {this.props.timer.splits.map(function(split) {
            return <Split split={split} key={split.id} />;
          })}
      </div>
    );
  }
});
