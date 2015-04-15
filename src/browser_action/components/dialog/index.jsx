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
        fetch(url, {
            'credentials': 'include'
        }).then(r => r.json())
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
        var style = StyleSheet.create`
            ._ {
                height: 14em;
                background-color: #f4f3f2;
                overflow-y: auto;
                overflow-x: hidden;
            }
        `._;
        return (
            <div>
                <Title style={{'textAlign': 'center'}} />
                <div style={{'margin': '0 5px'}}>
                    <div style={{'marginTop': '0.6em'}}>設定用URLを入力してください</div>
                    <div style={{'display': 'flex'}}>
                        <InputUrl status={this.state.status} onGetURL={this.onGetURL} />
                        <Status status={this.state.status} />
                    </div>
                    <pre style={style}>{result}</pre>
                    <div style={{'textAlign': 'center'}}>
                        <AddButton style={{'margin': '1em', 'height': '3em', 'width': '10em'}} disabled={this.state.status !== 'OK'} onClick={this.onOK} />
                        <CancelButton style={{'margin': '1em', 'height': '3em', 'width': '10em'}} onClick={this.onCancel} />
                    </div>
                </div>
            </div>
        );
    }
});
