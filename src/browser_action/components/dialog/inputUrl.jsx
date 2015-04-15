var assign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
        status: React.PropTypes.oneOf(['', 'Loading', 'OK', 'NG']).isRequired,
        onGetURL: React.PropTypes.func.isRequired
    },
    onUpdate() {
        setTimeout(() => {
            try {
                var url = new URL((this.refs.url.getDOMNode().value || '').trim().replace(/\s.+/, ''));
            } catch (e) {
                return;
            }
            this.props.onGetURL(url.href);
        });
    },
    onKeyUp(e) {
        if (e.key !== 'Enter') {
            return;
        }
        this.onUpdate();
    },
    componentDidMount() {
        this.refs.url.getDOMNode().focus();
    },
    render() {
        var styles = StyleSheet.create`
            .normal {
                border: solid 1px #60a1d8;
                box-shadow: inset 0px 0px 0px 3px #d8ebfb;
            }
            .OK {
                border: solid 1px #b8b9b6;;
                box-shadow: inset 0px 0px 0px 4px #f4f3f2;
            }
            .NG {
                border: solid 1px #f9423a;
                box-shadow: inset 0px 0px 0px 4px #fee3e2;
            }
        `;
        var style = assign.apply(null, [
            {},
            StyleSheet.create`._ { padding: 0.7em; width: 100%; }`._,
            styles[this.props.status] || styles['normal']
        ]);
        return (
            <input type="url" style={style} placeholder="http://example.com" autofocus ref="url" onKeyUp={this.onKeyUp} onPaste={this.onUpdate} />
        );
    }
});
