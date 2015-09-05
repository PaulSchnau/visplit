Navbar = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        return {
            currentUser: Meteor.user()
        };
    },
    render: function () {
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="/" className="navbar-brand">
                            <i className="fa fa-cube">
                            </i>Visplit
                        </a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="/">Live</a></li>
                            <li>{this.data.currentUser ? <a href="/run">Run</a> : <a href="/">Login to Run</a>}</li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <AccountsUIWrapper />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});
