require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

const matchMedia = require('match-media');

const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const hashHistory = require('react-router').hashHistory;

const Button = require('antd').Button;

const Dropdown = require('antd').Dropdown;

const Menu = require('antd').Menu;
const SubMenu = Menu.SubMenu;

const Breadcrumb = require('antd').Breadcrumb;

const Icon = require('antd').Icon;

const Select = require('antd').Select;
const Option = Select.Option;

const Tabs = require('antd').Tabs;
const TabPane = Tabs.TabPane;

module.exports = class TowerCrane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
    }
    onCollapseChange = () => {
        this.setState({
            collapse: !this.state.collapse,
        })
    }
    render() {
        return (
            <div>crane</div>
        )
    }
}
