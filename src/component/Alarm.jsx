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
const MenuCss = require("./Menu.css")

const json = {
    "alarm0": ["告警列表"],
    "alarm1": ["规则列表"]
}

const name = {
    "alarm0": ["告警","告警管理"],
    "alarm1": ["告警","规则管理"]
}
module.exports = class Alarm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            clicked: this.props.params.tab,

            newTabIndex: 0,
            activeKey:null,
            panes:[]
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            clicked: nextProps.params.tab
        });
    }
    onCollapseChange = () => {
        this.setState({
            collapse: !this.state.collapse,
        })
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = (value) => {
        console.log(value.key)
        const panes = this.state.panes;
        if (panes.length > 0) {
            for (let index = 0; index < panes.length; index++) {
                for (const key in panes[index]) {
                    if (panes[index].hasOwnProperty(key)) {
                        const element = panes[key];
                        if (panes[index]["title"] == value.key) {
                            this.setState({ activeKey: panes[index]["key"] });
                            return;
                        }
                    }
                }
            }
            const activeKey = `newTab${this.state.newTabIndex++}`;
            panes.push({ title: value.key, content: '新页面', key: activeKey });
            this.setState({ panes, activeKey });
        } else {
            const activeKey = `newTab${this.state.newTabIndex++}`;
            panes.push({ title: value.key, content: '新页面', key: activeKey });
            this.setState({ panes, activeKey });
        }


    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <div className={this.state.collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                <div className="ant-layout-sider">
                    <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']} onClick={this.add}>
                        {
                            json[this.state.clicked].map((item, index) => {
                                return (
                                    <Menu.Item key={item} className={this.state.collapse?"":MenuCss.test}>
                                        <Icon type="user" /><span className="nav-text">{item}</span>
                                    </Menu.Item>
                                )
                            })
                        }

                    </Menu>
                    <div className="ant-aside-action" onClick={this.onCollapseChange}>
                        {this.state.collapse ? <Icon type="right" /> : <Icon type="left" />}
                    </div>
                </div>
                <div className="ant-layout-main">
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <div style={{ height: 220 }}>
                                <div>
                                    <Tabs
                                        hideAdd
                                        onChange={this.onChange}
                                        activeKey={this.state.activeKey}
                                        type="editable-card"
                                        onEdit={this.onEdit}
                                    >
                                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                       jqmke 版权所有 © 2018 由技术研发部支持
                    </div>
                </div>
            </div>
        )
    }
}