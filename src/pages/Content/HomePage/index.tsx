import React from 'react';


class HomePage extends React.Component{

	async componentDidMount() {

		const test = await fetch('http://test-api.quando.pro/users/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: "sindrome5@gmail.com",
				password: "123321"
			})
		});
		const data = await test.json();

		console.log(data)
	}

	render() {
		return <div>Home Page</div>
	}
}

export default HomePage;