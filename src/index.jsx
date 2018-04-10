
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('./theme.less');
const matchMedia = require('match-media');

const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
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

const Alarm = require('./component/Alarm.jsx');
const App404 = require('./component/App404.jsx');
const Docgwif = require('./component/Docgwif.jsx');
const TowerCrane = require('./component/TowerCrane.jsx');
const User = require('./component/User.jsx');
const Video = require('./component/Video.jsx');
const IndexCss = require('./index.css');


const json = {
    "user0": ["用户管理", "用户组管理", "规则链列表"],
    "user1": ["权限列表", "权限组列表"],
    "user2": ["子系统列表"],
    "user3": ["资源组列表"],
    "user4": ["事件日志"],

    "video0": ["预览", "回放"],
    "video1": ["系统", "图像", "事件", "ptz"],

    "alarm0": ["告警列表"],
    "alarm1": ["规则列表"],

    "docgwif0": ["查询申报项目信息", "查询工程项目信息", "查询单位工程信息", "查询安装信息", "查询特殊项目", "查询设备列表", "查询未绑定设备", "查询设备绑定单位工程信息", "查询视频报建", "查询监控维护信息", "查询监控暂停信息", "查询监控恢复信息", "查询监控拆除信息", "查询监控设备运维日志", "查询工程设备统计信息", "查询用户日志信息"],
    "docgwif1": ["市建委工程信息", "设备信息"],

    "towerCrane0": ["towerCrane0.0"],
    "towerCrane1": ["towerCrane1.0"],
    "towerCrane2": ["towerCrane2.0"],
    "towerCrane3": ["towerCrane3.0"]
}

const firstLevelNavigation = {
    "user": "基础应用",
    "video": "视频",
    "alarm": "告警",
    "docgwif": "互联互通",
    "towerCrane": "吊装管理",
}
const secondLevelNavigation = {
    "user": [
        "用户管理",
        "权限管理",
        "系统管理",
        "资源组管理",
        "日志管理"
    ],

    "video": ["视频中心", "配置"],

    "alarm": ["告警管理", "规则管理"],

    "docgwif": ["住建厅", "市建委"],

    "towerCrane": ["选项1", "选项2", "选项3", "选项4"]
}

const menus = ["towerCrane", "docgwif", "alarm", "video", "user"]
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            firstLevelNavigationClick: "user",
            clicked: "user0"
        }
    }
    skinHandleChange = (value) => {
        console.log(value)
    }
    onCollapseChange = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    firstLevelNavigationClick = (value) => {
        let str = value.key.substr(0, value.key.length - 1)
        this.setState({
            clicked: value.key,
            firstLevelNavigationClick: str
        })
    }
    secondLevelNavigationClick = (value) => {
        console.log(value)
    }
    render() {
        return (
            <div className={IndexCss.antLayoutAside}>
                <div className={IndexCss.antLayoutHeader}>
                    <Menu theme="dark" mode="horizontal"
                        defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                        <Menu.Item className={IndexCss.antLayoutHeaderTitle} key="0">智能测量监控平台</Menu.Item>
                        <Menu.Item className={IndexCss.antLayoutHeaderMenus} key="1">
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        <a>目前是假的</a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a>目前是假的</a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a>目前是假的</a>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <Button type="ghost" icon="search" style={{ border: "none" }}>皮肤<Icon type="down" /></Button>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item className={IndexCss.antLayoutHeaderMenus} key="2" ><Button type="ghost" icon="logout" style={{ border: "none" }}>退出</Button></Menu.Item>
                        <Menu.Item className={IndexCss.antLayoutHeaderMenus} key="3"><Button type="ghost" icon="user" style={{ border: "none" }}>个人</Button></Menu.Item>
                        {
                            menus.map((item, index) => {
                                return (
                                    <SubMenu className={IndexCss.antLayoutHeaderMenus+" " + item} key={"sub" + index} title={<span><Icon type="setting" key={item} />{firstLevelNavigation[item]}</span>}>
                                        {secondLevelNavigation[item].map((item2, index) => {
                                            return (
                                                <Menu.Item key={item + index}><Link to={"/" + item + "/" + item + index}>{item2}</Link></Menu.Item>
                                            )
                                        })}
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </div>
                <div style={{ height: document.body.clientHeight - 64,borderTop:"1px solid #888888" }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={App404} />
            <Route path="/alarm/:tab" component={Alarm} />
            <Route path="/docgwif/:tab" component={Docgwif} />
            <Route path="/towercrane/:tab" component={TowerCrane} />
            <Route path="/user/:tab" component={User} />
            <Route path="/video/:tab" component={Video} />
            <Route path="/*" component={App404} />
        </Route>
    </Router>
    , document.getElementById("root"));