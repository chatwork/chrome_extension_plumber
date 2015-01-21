module.exports = React.createClass({
    propTypes: {
        status: React.PropTypes.oneOf(['', 'Loading', 'OK', 'NG']).isRequired
    },
    render() {
        var status = (() => {
            if (this.props.status === 'Loading') {
                return <img style={(ReactStyle`width: 2em; height: 2em;`).style} src="../img/loadingAnimetion.gif" />;
            }
            var color = {
                'OK': '#3f8500;',
                'NG': '#f9423a;'
            };
            return <span style={(ReactStyle`font-size: 1.5em; color: ${color[this.props.status]};`).style}>{this.props.status}</span>;
        })();
        var style = (ReactStyle`
            width: 5em;
            height: 2.5em;
            align-items: center;
            justify-content: center;
            display: flex;
        `).style;
        return (
            <div style={style}>{status}</div>
        );
    }
});
