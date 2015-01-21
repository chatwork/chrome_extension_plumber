var assign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
        'styles': React.PropTypes.object,
        'button': React.PropTypes.element
    },
    render() {
        var head = (ReactStyle`
            color: #195a77;
            background-color: #e6f0f6;
        `).style;
        var title = assign({}, (ReactStyle`
            font-size: 1.7em;
            font-weight: bold;
        `).style, this.props.styles);

        return (
            <div style={head}>
                <div style={title}>
                    <img style={(ReactStyle`padding: 4px 4px 0 4px;`).style} src="../img/icon_active.png" width="26" height="26" />
                    <span style={(ReactStyle`vertical-align: super;`).style}>Plumber</span>
                    {this.props.button}
                </div>
            </div>
        );
    }
});

