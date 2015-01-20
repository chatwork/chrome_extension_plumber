module.exports = React.createClass({
    propTypes: {
        status: React.PropTypes.oneOf(['', 'Loading', 'OK', 'NG']).isRequired
    },
    getDefaultProps() {
        return {
            status: ''
        };
    },
    render() {
        var status = this.props.status === 'Loading'
                ? <img src="../img/loading.svg" />
                : this.props.status
            ;
        return (
            <div className="status">{status}</div>
        );
    }
});
