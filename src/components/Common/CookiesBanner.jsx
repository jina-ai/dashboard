import React from "react";
import { Button } from "react-bootstrap";

class CookiesBanner extends React.Component {
	constructor(){
		super();
		this.state = {
			accepted: localStorage.getItem('accepted-cookies')
		}
	}
	acceptCookies = () =>{
		localStorage.setItem('accepted-cookies',true);
		this.setState({accepted: true});
	}
	render = () => {
		const {accepted} = this.state;
		return (
			<div className={`cookies-banner ${accepted?'hidden':''}`}>
				<p className="mb-2">
					We and third parties use cookies or similar technologies ("Cookies") as described below to collect and process personal data, such as your IP address or browser information. You can learn more about how this site uses Cookies by reading our privacy policy linked below. By clicking "I consent to cookies", you accept the placement and use of these Cookies for these purposes. You can change your mind and revisit your preferences at any time by accessing the “Cookie Preferences” link in the footer of this site.
				</p>
				<Button className="ml-auto d-block" onClick={this.acceptCookies}>I consent to cookies</Button>
			</div>
		)
	}
}

export default CookiesBanner;
