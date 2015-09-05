Run = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        var timer = TimersCollection.findOne({owner: Meteor.userId()});
        if (timer){
            return {timer: timer};
        } else {
            TimersCollection.insert({
                isStart: false,
                elapsed: 0,
                diff: 0,
                splits: [],
                owner: Meteor.userId()
            });
            timer = TimersCollection.findOne({owner: Meteor.userId()});
            return {timer: timer};
        }
    },
    render: function () {
        return (
            <div>
                <div className="col-md-6">
                    <Timer timer={this.data.timer} key={this.data.timer._id}/>
                </div>
            </div>
        );
    }
});
