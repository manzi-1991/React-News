import React,{Component} from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
require('../../css/mobile.css');
export default class MobileIndex extends Component {
	render() {
		return (
			<div>
				<MobileHeader></MobileHeader>
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}