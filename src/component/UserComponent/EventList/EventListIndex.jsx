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
const DatePicker = require('antd').DatePicker;
const Select = require('antd').Select;
const Option = Select.Option;

const UsersCss = require('./User.css');

const columns = [{
    title: '姓名',
    dataIndex: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
}];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `李大嘴${i}`,
        age: 32,
        address: `西湖区湖底公园${i}号`,
    });
}

module.exports = class EventListIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,

            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
        }
    }
    start = () => {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    disabledStartDate = (startValue) => {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.getTime() >= this.state.endValue.getTime();
    }
    disabledEndDate = (endValue) => {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.getTime() <= this.state.startValue.getTime();
    }
    onChange = (field, value) => {
        console.log(field, 'change', value);
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }
    handleStartToggle = ({ open }) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndToggle = ({ open }) => {
        this.setState({ endOpen: open });
    }
    handleChange = (value) => {
        console.log(value)
    }
    render() {
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className={UsersCss.dom}>
                <span className={UsersCss.text}>开始时间：</span>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    value={this.state.startValue}
                    placeholder="开始日期"
                    onChange={this.onStartChange}
                    toggleOpen={this.handleStartToggle}
                    showTime
                    format="yyyy/MM/dd HH:mm:ss"
                />
                <span className={UsersCss.text}>结束时间：</span>
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    value={this.state.endValue}
                    placeholder="结束日期"
                    onChange={this.onEndChange}
                    open={this.state.endOpen}
                    toggleOpen={this.handleEndToggle}
                    showTime
                    format="yyyy/MM/dd HH:mm:ss"
                />
                <span className={UsersCss.text}>类型：</span>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="yiminghe">yiminghe</Option>
                </Select>
                <div className={UsersCss.exampleInput}>
                    <span className={UsersCss.text}>用户名:</span>
                    <Input placeholder="默认尺寸" style={{ width: 100 }} />
                    <span className={UsersCss.text}>状态:</span>
                    <Input placeholder="小尺寸" style={{ width: 100 }} />
                </div>
                <Button type="primary" icon="search" />
                <Button type="primary" icon="reload" />
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.start}
                        disabled={!hasSelected}
                    >{this.state.loading?"操作中":"操作"}</Button>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 240 }}/>
            </div>
        );
    }
}