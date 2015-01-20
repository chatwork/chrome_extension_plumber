var Rule = require('./rule');
var RulesModel = require('../../../../base/rules/model');

module.exports = React.createClass({
    propTypes: {
        'rules': React.PropTypes.instanceOf(RulesModel).isRequired
    },
    render () {
        return (
            <ul>
                {this.props.rules.gets().map( rule => <Rule rule={rule} /> )}
            </ul>
        );
    }
});
