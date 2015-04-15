var Link = ReactRouter.Link;
var assign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
        'onClick': React.PropTypes.func.isRequired,
        'style': React.PropTypes.object
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
                text-shadow: 0px -1px 0px #fff;
                background-color: #d8d8d3;
                border: solid 1px #b8b9b6;
                box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.55);
            }
            .hover {
                text-shadow: 0px -1px 0px #fff;
                background-color: #e1e1e0;
                border: solid 1px #90918d;
                box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.75);
            }
            .active {
                background-color: #e1e1e0;
            }
        `;
        var base = StyleSheet.create`
            ._ {
                font-size:0.7em;
                color: #34362f;
                border-radius: 4px;
                padding: 4px 1.5em;
            }
        `._;
        var style = assign.apply(null, [{}, base, styles[this.state.status], this.props.style]);
        return (
            <button style={style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.props.onClick}>キャンセル</button>
        );
    }
});
