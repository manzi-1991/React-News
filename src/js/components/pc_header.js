import React,{Component} from 'react';
import {Row,Col} from 'antd';
import {Menu,Icon,Modal,Button,Input,message,Tabs,Form} from 'antd';
const Tabpane = Tabs.Tabpane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//记得没装插件react-html-attrs，那就是className

export default class PCHeader extends Component {
	constructor(props){
		super(props);
		this.state={
			current:'top',
			modalVisible:false,
			action:'login',
			hasLogined:false,
			userNickName:'',
			userid:0
		};
		//设置导航栏的点击事件
		this.handleClick = this.handleClick.bind(this);
		//设置Modal是否可见
		this.setModalVisible = this.setModalVisible.bind(this);
		//tabs的改动所引起的回调，主要用来改this.state.action
		this.callback = this.callback.bind(this);
		//登录注册时提交的动作
		this.handleSubmit = this.handleSubmit.bind(this);
		this.logout = this.logout.bind(this);
	}
	//点击导航栏的图标文件，给当前的图标文件加上高亮，如果是注册/登录，还要弹出Modal
	handleClick(e){
		if(e.key=='register'){
			this.setState({modalVisible:true,current:"register"});
		}else{
			this.setState({current: e.key });
		}
	}
	//模板的onOk和onCancel事件
	setModalVisible(value){
		this.setState({modalVisible:vlue})
	}
	//tabs的改动所引起的回调，主要用来改this.state.action
	callback(){
		
	}
	//登录注册时提交的动作
	handleSubmit(){
		
	}
	//退出登录事件，清空localstorage中所存储的信息
	logout(){
		
	}
	render() {
		//详情请见Ant Design的相关api说明
		const { getFieldDecorator } = this.props.form;
		//设置注册/登录菜单项，如果登录则展示个人中心，如果未登录则展示注册/登录菜单
		//本来register是可以设置点击事件的，但是利用事件委托，直接委托给《Menu》
		const userShow = this.state.hasLogined
			?<Menu.Item key='logined' className='logined'>
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
				//个人中心是会跳转到个人中心页面的
				<Link target="_blank">
					<Button type="dashed" htmlType="button">个人中心</Button>
				</Link>
				&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout}>退出</Button>
				
			</Menu.Item>
			:<Menu.Item key='register' className='register'>
				<Icon type="appstore"/>注册/登录
			</Menu.Item>
		return (
			<header className='pc-header'>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href='/' className='logo'>
							<img src='./images/logo.png' alt='logo'/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode='horizontal' onClick={this.handleClick} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="scan"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="team"/>社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="trophy"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="global"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="coffee"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="man"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="rocket"/>科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="skin"/>时尚
							</Menu.Item>
						</Menu>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Modal 
					title="用户中心" 
					wrapClassName="vertical-center-modal" 
					visible={this.state.modalVisible}
					onOk={this.setModalVisible(true)}
					onCancel={this.setModalVisible(false)}
					okText="关闭"
				>
					<Tabs type='card' onChange={this.callback}>
						//分为两个TabPane，一个登录，一个注册
						<TabPane tab="登录" key="1">
							<Form horizontal onSubmit={this.handleSubmit}>
								<FormItem label='账户'>
									
								</FormItem>
							<Form>
						</TabPane>
						
						<TabPane tab="注册" key="2">
							<Form horizontal onSubmit={this.handleSubmit}>
								
							<Form>
						</TabPane>
			</header>
		);
	};
}