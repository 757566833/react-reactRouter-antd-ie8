require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
const matchMedia = require('match-media');

const React = require('react');
const ReactDOM = require('react-dom');

module.exports = class App404 extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>404</div>
        )
    }
}


