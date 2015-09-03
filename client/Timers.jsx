Timers = React.createClass({  
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      timers: TimersCollection.find({}).fetch()
    };
  },
  addTimer: function(e) {
    e.preventDefault();
    TimersCollection.insert({
      isStart: false,
      elapsed: 0,
      diff: 0,
      laps: []
    });
  },
  render: function () {
    return (
      <div>
          {this.data.timers.map(function (timer) {
            return <Timer timer={timer} key={timer._id}/>;
          })}
        <form onSubmit={this.addTimer}>
          <button type="submit">Add Timer</button>
        </form>
      </div>
    );
  }
});