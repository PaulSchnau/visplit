LiveTimer = React.createClass({
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
            this.state = {timer: undefined};
        }
        if (!this.state.timer){
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
    render: function() {
        var split = null;
        var splits = this.props.timer.splits;
        if (splits.length > 0){
            split = splits[splits.length - 1];
        }
        return (
            <div>
                <h1>{this.getTimeSpan(this.state.elapsed)}</h1>
                {split ? <Split split={split} key={split.id} /> : null}
            </div>
        );
    }
});
