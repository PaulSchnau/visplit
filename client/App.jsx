App = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function () {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});
