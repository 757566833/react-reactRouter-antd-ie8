require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

const matchMedia = require('match-media');

const React = require('react');

const Button = require('antd').Button;
const Table = require('antd').Table;
const Icon = require('antd').Icon;
const Input = require('antd').Input;
const Modal = require('antd').Modal;

const UsersCss = require('./User.css');



const data = [{
    key: '1',
    ID: '1',
    name: '胡彦斌',
    email: "1@qq.com",
    phone: '123456789',
    description: '1',
    state: '1',
    userGroup: '01'
}, {
    key: '2',
    ID: '2',
    name: '吴彦祖',
    email: "2@qq.com",
    phone: '456789123',
    description: '2',
    state: '2',
    userGroup: '02'
}, {
    key: '3',
    ID: '3',
    name: '李大嘴',
    email: "3@qq.com",
    phone: '789456123',
    description: '3',
    state: '3',
    userGroup: '03'
}];
module.exports = class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterDropdownVisible: false,


            data: data,
            searchText: '',


            ModalText: '对话框的内容',
            visible: false,
            confirmLoading:false
        }
    }

    showModal= ()=> {
        this.setState({
            visible: true,
        });
    }
    handleOk=()=> {
        this.setState({
            ModalText: '添加用户',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel=()=> {
        console.log('点击了取消');
        this.setState({
            visible: false,
        });
    }


    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            data: data.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
                            {record.name.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }
    render() {
        const columns = [{
            title: '用户ID',
            dataIndex: 'ID',
            key: 'ID'
        }, {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible })
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        }, {
            title: '所属用户组',
            dataIndex: 'userGroup',
            key: 'userGroup',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="#">操作一{record.name}</a>
                    <span className="ant-divider"></span>
                    <a href="#">操作二</a>
                    <span className="ant-divider"></span>
                    <a href="#" className="ant-dropdown-link">
                        更多 <Icon type="down" />
                    </a>
                </span>
            ),
        }];
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.showModal}>添加用户</Button>
                    <Modal title="添加用户"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText={this.state.confirmLoading?"正在提交":"确定"}
                    >
                        <p>{this.state.ModalText}</p>
                    </Modal>
                    <Button type="primary" icon="reload"/>
                </div>
                <Table className={UsersCss.tables} columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}