import React, { useState, useEffect } from 'react'
import { watchInterface, watchInterfacDay } from '../interfaces/watchInterface'
import ApiHelper from '../helpers/ApiHelper';
import HistoryItem from '../components/HistoryItem';

// TODO: deal with more pages(show more...)
const History = () => {
	const [ watches, setWatches ] = useState<watchInterfacDay[]>([]);

	useEffect(() => {
		ApiHelper.get('history/me', (history: watchInterfacDay[]) => {			
			setWatches(history);			
		})
	}, [])

	return (
		<div className="container">
			<h2 id="your-history-title">Your watch history:</h2>

			{ watches && watches.map((day: watchInterfacDay) => (
				<div className="history-day">
					<div className="history-day-title">{ day.date }</div>
					<div id="history-list">
						{ day.history && day.history.map((watch: watchInterface) => (
							<HistoryItem item={watch}/>
						)) }
					</div>
				</div>
			)) }
		</div>
	)
}

export default History