require('fetch');

var Status = require('./status');

module.exports = React.createClass({
    propTypes: {
        'onNewRule': React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            status: '',
            result: ''
        };
    },
    onCancel() {
        location.hash = '';
    },
    onOK() {
        this.props.onNewRule(this.state.result);
    },
    onBlur(e) {
        var url = (e.target.value || '').trim();
        if (!url) {
            return;
        }
        this.setState({ status: 'Loading' });
        setTimeout(() => {
            if (!this.isMounted()) {
                return;
            }
            this.setState({ status: 'OK', result : {
                'name' : 'setting name',
                'enable': true,
                'urls' : ['http://0-9.tumblr.com/'],
                'types' : ['script'],
                'matchs' : [
                    {
                        'url' : 'http://0-9.tumblr.com/tweets.js',
                        'redirect' : 'http://jsrun.it/otoyasumi/A0b1/js'
                    }
                ],
                'content_script' : '',
                'content_stylesheet' : ''
            } });
        }, 500);
        //fetch(url)
        //    .then((response) => {
        //        return response.json();
        //    }).then((json) => {
        //        this.setState({ status: 'OK', result : json });
        //    }).catch((ex) => {
        //        this.setState({ status: 'NG', result : ex.message });
        //    });
    },
    render() {
        var disabled = this.state.status !== 'OK';
        var result = this.state.result ? JSON.stringify(this.state.result) : '';
        return (
            <div className="dialog">
                <div className="header">
                    <span className="title">plumber settings</span>
                </div>
                <div className="modal-header">
                    <h3 className="modal-title">設定用URLを入力してください</h3>
                </div>
                <div className="modal-body">
                    <input type="url" placeholder="http://example.com" autofocus onBlur={this.onBlur} />
                    <Status status={this.state.status} />
                    <pre className="result">{result}</pre>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" disabled={disabled} onClick={this.onOK}>OK</button>
                    <button className="btn btn-warning" onClick={this.onCancel}>Cancel</button>
                </div>
            </div>
        );
    }
});
