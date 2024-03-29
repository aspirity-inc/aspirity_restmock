namespace $.$$ {

	const SECOND = 1000
	const MINUTE = SECOND * 60
	const HOUR = MINUTE * 60
	const DAY = HOUR * 24

	export class $aspirity_restmock_request_link extends $.$aspirity_restmock_request_link {
		
		id() {
			return this.request().id()
		}
		
		title() {
			return this.request().title()
		}
		
		unit( ms : number ) {
			if ( ms < MINUTE ) return 'second'
			if ( ms < HOUR ) return 'minute'
			if ( ms < DAY ) return 'hour'
			return 'day'
		}
		
		@ $mol_mem
		age() {
			const moment = new $mol_time_moment( this.request().moment() )
			const ms = $mol_state_time.now( 1000 ) - moment.valueOf()
			const age = new $mol_time_duration( ms )
			
			const format = { second: 'PT1S', minute: 'PT1M', hour: 'PT1H', day: 'P1DT' }
			const unit = this.unit( ms )
			const value = Math.round( age.count( format[ unit ] ) )
			
			return `${ value } ${ this.units()[ unit ].select( value ) } ${ super.age() }`
		}

	}

}
