import React,{Component} from 'react';
import {Row,Col} from 'antd';

export default class PCFooter extends Component {
	render(){
		return(
			<footer className='pc-footer'>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="footer">
						&copy;&nbsp;2017 ReactNews.AllRightsReserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		)
	}
}