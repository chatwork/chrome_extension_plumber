var RuleModel = require('../../../../base/rule/model');

module.exports = React.createClass({
    propTypes: {
        'rule': React.PropTypes.instanceOf(RuleModel).isRequired
    },
    render () {
        return (
            <li>
                <input type="checkbox" ng-model="rule.enable" />
                <span className="settingName">name</span>
                <input type="button" value="update" />
                <input type="button" value="del" />
            </li>
        );
    }
});
