var Rule = require('./rule');
var RulesModel = require('../../../../base/rules/model');

module.exports = React.createClass({
    propTypes: {
        'onUpdate': React.PropTypes.func.isRequired,
        'onDelete': React.PropTypes.func.isRequired,
        'onChangeEnable': React.PropTypes.func.isRequired,
        'rules': React.PropTypes.instanceOf(RulesModel).isRequired
    },
    render () {
        var rules = this.props.rules.gets().map((rule, idx, all) => {
            var last = all.length === idx + 1;
            return <Rule key={rule.id} rule={rule} last={last} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} onChangeEnable={this.props.onChangeEnable} />;
        });
        return (
            <ul style={StyleSheet.create`._ { margin: 5px; }`._}>{rules}</ul>
        );
    }
});
