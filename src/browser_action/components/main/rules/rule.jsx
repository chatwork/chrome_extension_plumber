var assign = require('object-assign');

var RuleModel = require('../../../../base/rule/model');
var Toggle = require('./toggle');

module.exports = React.createClass({
    propTypes: {
        'onUpdate': React.PropTypes.func.isRequired,
        'onDelete': React.PropTypes.func.isRequired,
        'onChangeEnable': React.PropTypes.func.isRequired,
        'rule': React.PropTypes.instanceOf(RuleModel).isRequired,
        'last': React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return {
            status: ''
        };
    },
    onChange(checked) {
        this.props.onChangeEnable(this.props.rule, checked);
    },
    onUpdate() {
        this.setState({ status: 'onUpdate' });
        this.props.onUpdate(this.props.rule);
    },
    onDelete() {
        this.setState({ status: 'onDelete' });
        this.props.onDelete(this.props.rule);
    },
    render() {
        var lbase = StyleSheet.create`
            ._ {
                display: flex;
                align-items: center;
            }
        `._;
        var lblast = this.props.last
            ? {}
            : StyleSheet.create`
                ._ {
                    border-bottom-style: dotted;
                    border-bottom-width: 1px;
                }
            `._
        ;
        var listyle = this.props.rule.enable
            ? {}
            : StyleSheet.create`
                ._ {
                    background-color: #f1f2f3;
                }
            `._
        ;
        var buttonstyle = StyleSheet.create`
            ._ {
                cursor: pointer;
            }
        `._;
        var imgstyle = StyleSheet.create`
            ._ {
                width: 1.2em;
                height: 1.2em;
                margin: 0 5px;
            }
        `._;
        var svgstyle = StyleSheet.create`
            ._{
                fill: #8d9092;
            }
        `._;
        var spanstyle = StyleSheet.create`
            ._{
                margin: 4px 0px 0px 5px;
                font-size: 1.4em;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
            }
        `._;
        var loading = <img style={imgstyle} src="../img/loadingAnimetion.gif" />;
        var updateButton = this.state.status !== 'onUpdate' ? (
            <button style={buttonstyle} onClick={this.onUpdate}>
                <svg style={imgstyle} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path style={svgstyle} d="M167.5,100L200,28.9l-35.3,13.3C147,20,120.9,7.5,92.5,7.5C41.6,7.5,0,48.9,0,100s41.6,92.5,92.5,92.5 c24.7,0,48-9.7,65.5-27.2c6.9-6.9,6.9-18,0-24.7c-6.9-6.9-18-6.9-24.7,0c-10.9,10.9-25.3,16.9-40.6,16.9 c-31.7,0-57.5-25.8-57.5-57.5s25.8-57.5,57.5-57.5c13.6,0,26.2,4.7,36.4,13L96.6,67.7L167.5,100z" />
                </svg>
            </button>
        ) : loading;
        var deleteButton = this.state.status !== 'onDelete' ? (
            <button style={buttonstyle} onClick={this.onDelete}>
                <svg style={imgstyle} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <polygon style={svgstyle} points="149.1,36.4 149.1,3.6 50.9,3.6 50.9,36.4 0,36.4 0,67.3 16.4,67.3 16.4,196.4 49.1,196.4 49.1,67.3 67.3,67.3 67.3,196.4 132.7,196.4 132.7,67.3 150.9,67.3 150.9,196.4 183.6,196.4 183.6,67.3 200,67.3 200,36.4" />
                </svg>
            </button>
        ) : loading;
        return (
            <li style={assign.apply(null, [{}, listyle, lbase, lblast])}>
                <Toggle defaultChecked={this.props.rule.enable} onChange={this.onChange} />
                <div><span style={spanstyle} title={this.props.rule.name}>{this.props.rule.name}</span></div>
                <div style={StyleSheet.create`._{ width: 85px; }`._}>
                    {updateButton}
                    {deleteButton}
                </div>
            </li>
        );
    }
});
