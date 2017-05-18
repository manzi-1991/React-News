import React,{Component} from 'react';
//与pc的头部不同的是，这里的头部不需要用a标签进行包裹
export default class MobileHeader extends Component {
	render(){
		return(
			<div className="mobile-header">
		        <header>
		          <img src="./images/logo.png" alt="logo"/>
		          <span>ReactNews</span>
		        </header>
      		</div>
		)
	}
}