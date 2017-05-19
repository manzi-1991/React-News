import React,{Component} from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import {Row,Col} from 'antd';
import {Menu,Icon,Modal,Button,Input,message,Tabs,Form} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//记得没装插件react-html-attrs，那就是className

class PCHeader extends Component {
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
		//this.setModalVisible = this.setModalVisible.bind(this);
		//tabs的改动所引起的回调，主要用来改this.state.action
		this.callback = this.callback.bind(this);
		//登录注册时提交的动作
		this.handleSubmit = this.handleSubmit.bind(this);
		this.logout = this.logout.bind(this);
	}
	//渲染组件之前，先对localstorage作判断，看看是否登录
	componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	}
	//点击导航栏的图标文件，给当前的图标文件加上高亮，如果是注册/登录，还要弹出Modal
	handleClick(e){
		console.log(e.key)
		if(e.key=='register'){
			this.setState({modalVisible:true,current:"register"},()=>{
				console.log(this.state);
			});
			
			
		}else{
			//setsState是异步的，可以在回调函数console.log查看state状态
			this.setState({current: e.key },()=>{
				console.log(this.state);
			});
			
		}
	}
	//模板的onOk和onCancel事件
	setModalVisible(value){
		this.setState({modalVisible:value})
	}
	//tabs的改动所引起的回调，主要用来改this.state.action
	callback(key){
		//console.log(e.key)  这个是错误的用法，与handleClick区别开来
		if(key== 1){
			this.setState({action:'login'},()=>{
				console.log(this.state.action)
			});
			
		}else if(key== 2){
			this.setState({action:'register'},()=>{
				console.log(this.state.action)
			});
		}
	}
	//登录注册时提交的动作，向api提交数据
	handleSubmit(e){
		//组织默认行为
		e.preventDefault();
		let myFetchOptions = {
			method:'GET'
		};
		let formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
		+"&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response=>{
			console.log(response);
			console.log(this.state);
			return response.json();
		}).then(json=>{
			this.setState({userNickName:json.NickUserName,userid:json.userId});
			//将用户的登录信息添加到localstorage
			localStorage.userNickName = json.NickUserName;
			localStorage.userid= json.UserId;
		})
		if(this.state.action=='login'){
			
			this.setState({hasLogined:true},()=>{
				console.log(this.state.hasLogined)
			})
		}
		message.success('请求成功');
		this.setModalVisible(false);
	}
	//退出登录事件，清空localstorage中所存储的信息
	logout(){
		localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	}
	render() {
		//详情请见Ant Design的相关api说明
		const { getFieldProps } = this.props.form;
		//设置注册/登录菜单项，如果登录则展示个人中心，如果未登录则展示注册/登录菜单
		//本来register是可以设置点击事件的，但是利用事件委托，直接委托给《Menu》
		const UserShow = this.state.hasLogined
			? <Menu.Item key="logout" className="logout">
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
				<Button type="dashed" htmlType="button">个人中心</Button>
				&nbsp;&nbsp;
				<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
			</Menu.Item>	
			: <Menu.Item key="register" className="register" >
				<Icon type="user"/>注册/登录
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
							{UserShow}
						</Menu>
						<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
								<TabPane tab="注册" key="2">
									<Form  onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
										</FormItem>
										<FormItem label="确认密码">
											<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
						
					</Col>
					<Col span={2}></Col>
				</Row>
				
			</header>
		);
	};
}
//二次封装，否则const { getFieldDecorator } = this.props.form;就是null或者undefined
export default PCHeader = Form.create({})(PCHeader);