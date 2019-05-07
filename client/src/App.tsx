import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import './../node_modules/semantic-ui-css/semantic.min.css'
import './App.css'

import { Store } from './redux/store'

interface IAppProps {
	nPhoneNumber: number
}

class App extends React.Component<IAppProps, {}> {
	constructor(props: any) {
		super(props)
	}

	public render() {
		const { nPhoneNumber } = this.props

		return (
			<div className="App ui container">
				<h1>online-sms</h1>
				<p>{nPhoneNumber}</p>
				<hr />
				{moment().format('DD MM YYYY')}
			</div>
		)
	}
}

const mapStateToProps = (state: Store.App) => {
	const { nPhoneNumber } = state
	return {
		nPhoneNumber,
	}
}

export default connect(mapStateToProps)(App)
