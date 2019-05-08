import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import './../node_modules/semantic-ui-css/semantic.min.css'
import './App.css'

import { Balance } from 'src/declarations'
import { Store } from 'src/redux/store'

interface IAppProps {
	nPhoneNumber: number
	nAccountBalance: Balance
}

class App extends React.Component<IAppProps, {}> {
	constructor(props: any) {
		super(props)
	}

	public render() {
		const { nAccountBalance } = this.props

		return (
			<div className="App ui container">
				<h1>online-sms</h1>
				<p>
					{nAccountBalance === null
						? '[balance unknown]'
						: nAccountBalance}
				</p>
				<hr />
				{moment().format('DD MM YYYY')}
			</div>
		)
	}
}

const mapStateToProps = (state: Store.App) => {
	const { nAccountBalance, nPhoneNumber } = state
	return {
		nAccountBalance,
		nPhoneNumber,
	}
}

export default connect(mapStateToProps)(App)
