var Rules = require('./rules/index');
var RulesModel = require('../../../base/rules/model');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    propTypes: {
        'rules': React.PropTypes.instanceOf(RulesModel).isRequired
    },
    render() {
        var styles = ReactStyle({
            color: 'red',
            backgroundColor: 'black'
        });
        return (
            <div>
                <div>
                    <span>plumber settings</span>
                    <span>
                        <Link to="dialog">Add</Link>
                    </span>
                </div>
                <hr />
                <Rules rules={this.props.rules} />
            </div>
        );
    }
});

