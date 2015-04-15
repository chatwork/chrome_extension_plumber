module.exports = React.createClass({
    propTypes: {
        status: React.PropTypes.oneOf(['', 'Loading', 'OK', 'NG']).isRequired
    },
    render() {
        var status = (() => {
            if (this.props.status === 'Loading') {
                return <img style={StyleSheet.create`._ { width: 2em; height: 2em; }`._} src="../img/loadingAnimetion.gif" />;
            }
            var color = {
                'OK': '#3f8500;',
                'NG': '#f9423a;'
            };
            var dialogStatusSpanInline = StyleSheet.create`
                ._ {
                    font-size: 1.5em;
                    color: ${color[this.props.status]};
                }
            `._;
            return <span style={dialogStatusSpanInline}>{this.props.status}</span>;
        })();
        var style = StyleSheet.create`
            ._ {
                width: 5em;
                height: 2.5em;
                align-items: center;
                justify-content: center;
                display: flex;
            }
        `._;
        return (
            <div style={style}>{status}</div>
        );
    }
});
