var { Route, DefaultRoute } = ReactRouter;
var MainComponent = React.createFactory(require('./components/main/index'));
var DialogComponent = React.createFactory(require('./components/dialog/index'));

class Router {
    _getMain(rulesModel, onUpdate, onDelete, onChangeEnable) {
        return React.createClass({
            render() {
                return MainComponent({
                    rules: rulesModel,
                    onUpdate: onUpdate,
                    onDelete: onDelete,
                    onChangeEnable: onChangeEnable
                });
            }
        });
    }
    _getDialog(onNewRule) {
        return React.createClass({
            render() {
                return DialogComponent({
                    onNewRule: onNewRule
                });
            }
        });
    }
    run(rulesModel, onNewRule, onUpdate, onDelete, onChangeEnable) {
        var app = require('./components/app');
        var main = this._getMain(rulesModel, onUpdate, onDelete, onChangeEnable);
        var dialog = this._getDialog(onNewRule);

        return ReactRouter.run((
            <Route handler={app}>
                <Route name="dialog" path="/dialog" handler={dialog} />
                <Route name="top" path="/" handler={main} />
                <DefaultRoute handler={main} />
            </Route>
        ), function (Handler) {
            React.render(<Handler />, document.body);
        });
    }
}
module.exports = Router;