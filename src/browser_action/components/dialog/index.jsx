require('fetch');

var InputUrl = require('./inputUrl');
var Status = require('./status');
var Title = require('../head/title');
var AddButton = require('../button/add');
var CancelButton = require('../button/cancel');

module.exports = React.createClass({
    mixins: [ReactRouter.Navigation],
    propTypes: {
        'onNewRule': React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            status: '',
            manifest_url: undefined,
            result: undefined
        };
    },
    onCancel() {
        this.transitionTo('top');
    },
    onOK() {
        this.props.onNewRule(this.state.manifest_url, this.state.result);
    },
    _fetchJSON(url) {
        fetch(url).then(r => r.json())
            .then((json) => {
                this.setState({ status: 'OK', manifest_url: url, result : json });
            }).catch((ex) => {
                this.setState({ status: 'NG', result : ex.message });
            })
        ;
    },
    onGetURL(url) {
        this.setState({ status: 'Loading' });
        this._fetchJSON(url);
    },
    render() {
        var result = this.state.result ? JSON.stringify(this.state.result, null, '\t') : '';
        var style = (ReactStyle`
            height: 14em;
            background-color: #f4f3f2;
            overflow-y: auto;
            overflow-x: hidden;
        `).style;
        return (
            <div>
                <Title styles={(ReactStyle`text-align: center;`).style} />
                <div style={(ReactStyle`margin: 0 5px;`).style}>
                    <div style={(ReactStyle`margin-top: 0.6em;`).style}>設定用URLを入力してください</div>
                    <div style={(ReactStyle`display: flex;`).style}>
                        <InputUrl status={this.state.status} onGetURL={this.onGetURL} />
                        <Status status={this.state.status} />
                    </div>
                    <pre style={style}>{result}</pre>
                    <div style={(ReactStyle`text-align: center;`).style}>
                        <AddButton style={(ReactStyle`margin: 1em; height: 3em; width: 10em;`).style} disabled={this.state.status !== 'OK'} onClick={this.onOK} />
                        <CancelButton style={(ReactStyle`margin: 1em; height: 3em; width: 10em;`).style} onClick={this.onCancel} />
                    </div>
                </div>
            </div>
        );
    }
});
