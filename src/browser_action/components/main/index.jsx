var Rules = require('./rules/index');
var RulesModel = require('../../../base/rules/model');
var AddButton = require('../button/add');
var Title = require('../head/title');

var Link = ReactRouter.Link;

module.exports = React.createClass({
    mixins: [ReactRouter.Navigation],
    propTypes: {
        'rules': React.PropTypes.instanceOf(RulesModel).isRequired
    },
    onClick() {
        this.transitionTo('dialog');
    },
    componentWillMount() {
        if (!this.props.rules.gets().length) {
            this.transitionTo('dialog');
            return;
        }
    },
    render() {
        var button = (() => {
            var style = StyleSheet.create`
                ._ {
                    vertical-align: top;
                    margin-top: 4px;
                    position: absolute;
                    right: 7px;
                }
            `._;
            return <AddButton style={style} onClick={this.onClick} />;
        })();
        return (
            <div>
                <Title button={button} />
                <Rules {...this.props} />
            </div>
        );
    }
});

