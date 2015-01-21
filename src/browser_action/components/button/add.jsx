var Link = ReactRouter.Link;
var assign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
        'onClick': React.PropTypes.func.isRequired,
        'style': React.PropTypes.object,
        'disabled': React.PropTypes.bool
    },
    getInitialState() {
        return {
            status: 'normal'
        };
    },
    onMouseEnter() {
        this.setState({ status: 'hover' });
    },
    onMouseLeave() {
        this.setState({ status: 'normal' });
    },
    render () {
        var styles = {
            'normal': (ReactStyle`
                text-shadow: 0px -1px 0px #0a3e6a;
                background-color: #1972be;
                border: solid 1px #1972be;
                box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.25);
            `).style,
            'hover': (ReactStyle`
                text-shadow: 0px -1px 0px #025297;
                background-color: #1f80d3;
                border: solid 1px #1f80d3;
                box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.35);
            `).style,
            'active': (ReactStyle`
                border: solid 1px #156cb6;
            `).style,
            'inactive': (ReactStyle`
                background-color: #c9d8e4;
            `).style
        };
        var base = (ReactStyle`
            font-size:0.7em;
            color: #fff;
            border-radius: 4px;
            padding: 4px 1.5em;
            border: none;
        `).style;
        var type = this.props.disabled ? 'inactive' : this.state.status;
        var style = assign({}, base, styles[type], this.props.style);
        return (
            <button style={style} disabled={this.props.disabled} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.props.onClick}>追加</button>
        );
    }
});
