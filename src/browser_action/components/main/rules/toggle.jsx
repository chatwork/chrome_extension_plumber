var assign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
        defaultChecked: React.PropTypes.bool.isRequired,
        onChange: React.PropTypes.func.isRequired
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
    onMouseDown() {
        this.setState({ status: 'active' });
    },
    onMouseUp() {
        this.setState({ status: 'hover' });
    },
    onChange() {
        this.setState({ status: 'loading' });
        this.props.onChange(!this.props.defaultChecked);
    },
    render() {
        var base = StyleSheet.create`
            ._ {
                display: inline-flex;
                width: 11em;
                height: 1.6em;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                cursor: pointer;
                font-size: 0.8em;
                border: solid 1px;
            }
        `._;
        var styles = {
            'ON' : StyleSheet.create`
                .normal {
                    text-shadow: 0px -1px 0px #1d6700;
                    box-shadow: inset 0px 1px 0px 0px #3f8500;
                    background-color: #30a004;
                    color: #fff;
                }
                .hover {
                    background-color: #ecffe4;
                    border: solid 1px #53a134;
                    color: #3f8500;
                }
                .active {
                    background-color: #f1f2f3;
                    border: solid 1px #676863;
                    color: #34362;
                }
            `,
            'OFF' : StyleSheet.create`
                .normal {
                    background-color: #fff;
                    border: solid 1px #90918d;
                    color: #686f72;
                }
                .hover {
                    background-color: #cdffab;
                    border: solid 1px #7db541;
                    color: #006100;
                }
                .active {
                    background-color: #288205;
                    color: #fff;
                }
            `
        };
        var status = this.props.defaultChecked ? 'ON' : 'OFF';
        var target = styles[status];
        var style = assign.apply(null, [{}, base, target[this.state.status] || {}]);
        var button = this.state.status !== 'loading'
            ? <span style={style} role="button" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onClick={this.onChange}>{status}</span>
            : <span style={[style, StyleSheet.create`._ { cursor: auto; }`._]}><img style={StyleSheet.create`._ { height: 100%; }`._} src="../img/loadingAnimetion.gif" /></span>
        ;
        return button;
    }
});
