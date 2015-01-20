var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

class Router {
    constructor() {
    }
    _getMain(rulesModel) {
        return React.createClass({
            render() {
                return require('./components/main/index')({rules: rulesModel});
            }
        });
    }
    _getDialog(onNewRule) {
        return React.createClass({
            render() {
                return require('./components/dialog/index')({onNewRule: onNewRule});
            }
        });
    }
    run(rulesModel, onNewRule) {
        var app = require('./components/app');
        var main = this._getMain(rulesModel);
        var dialog = this._getDialog(onNewRule);

        return ReactRouter.run((
            <Route handler={app}>
                <Route name="dialog" path="/dialog" handler={dialog} />
                <DefaultRoute handler={main} />
            </Route>
        ), function (Handler) {
            React.render(<Handler />, document.body);
        });
    }
}
module.exports = Router;