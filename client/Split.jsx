Split = React.createClass({
  render: function() {
    return (
      <div>
          <div className="row">
              <div className="col-xs-4">
                  <img src={this.props.split.image} />
              </div>
              <div className="col-xs-4">
                  {this.props.split.name}
              </div>
              <div className="col-xs-4">
                  {this.props.split.time}
              </div>
          </div>
      </div>
    );
  }
});
