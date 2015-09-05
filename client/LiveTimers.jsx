LiveTimers = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      timers: TimersCollection.find({isStart: true}).fetch()
    };
  },
  render: function () {
    return (
      <div>
          {this.data.timers.map(function (timer) {
            return <LiveTimer timer={timer} key={timer._id}/>;
          })}
      </div>
    );
  }
});
