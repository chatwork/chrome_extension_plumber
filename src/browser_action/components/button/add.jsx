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
        var styles = StyleSheet.create`
            .normal {
                text-shadow: 0px -1px 0px #0a3e6a;
                background-color: #1972be;
                border: solid 1px #1972be;
                box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.25);
            }
            .hover {
                text-shadow: 0px -1px 0px #025297;
                background-color: #1f80d3;
                border: solid 1px #1f80d3;
                box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.35);
            }
            .active {
                border: solid 1px #156cb6;
            }
            .inactive {
                background-color: #c9d8e4;
            }
        `;
        var base = StyleSheet.create`
            ._ {
                font-size:0.7em;
                color: #fff;
                border-radius: 4px;
                padding: 4px 1.5em;
                border: none;
            }
        `._;
        var type = this.props.disabled ? 'inactive' : this.state.status;
        var style = assign.apply(null, [{}, base, styles[type], this.props.style]);
        return (
            <button style={style} disabled={this.props.disabled} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.props.onClick}>追加</button>
        );
    }
});
