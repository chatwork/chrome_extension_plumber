var assign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
        'styles': React.PropTypes.object,
        'button': React.PropTypes.element
    },
    render() {
        var head = StyleSheet.create`
            ._ {
                color: #195a77;
                background-color: #e6f0f6;
            }
        `._;
        var title = assign.apply(null, [
            {},
            StyleSheet.create`
                ._ {
                    font-size: 1.7em;
                    font-weight: bold;
                }
            `._,
            this.props.styles
        ]);
        return (
            <div style={head}>
                <div style={title}>
                    <img style={StyleSheet.create`._ { padding: 4px 4px 0 4px; }`._} src="../img/icon_active.png" width="26" height="26" />
                    <span style={StyleSheet.create`.v { vertical-align: super; }`._}>Plumber</span>
                    {this.props.button}
                </div>
            </div>
        );
    }
});

