namespace $ {
	
	export type $aspirity_restmock_request_type = {
		url : string
		method : string
		rawHeaders : string[]
		headers : { [ key : string ] : string } | { 'set-cookie' : string | string[] } 
		rawBody : string
		fail : string
		moment : string
	}

	export class $aspirity_restmock_request extends $mol_store< $aspirity_restmock_request_type > {

		id(): string {
			return this.$.$mol_fail( new Error( 'id is not defined' ) )
		}
		
		url( next? : string ) {
			return this.value( 'url' , next ) ?? ''
		}
		
		method( next? : string ) {
			return this.value( 'method' , next ) ?? ''
		}
		
		rawHeaders( next? : string[] ) {
			return this.value( 'rawHeaders' , next ) ?? ''
		}
		
		headers( next? : $aspirity_restmock_request_type['headers'] ) {
			return this.value( 'headers' , next ) ?? ''
		}
		
		rawBody( next? : string ) {
			return this.value( 'rawBody' , next ) ?? ''
		}
		
		fail( next? : Error ) {
			return this.value( 'fail' , next?.stack ) ?? ''
		}
		
		@ $mol_mem
		moment( next?: $mol_time_moment ) {
			const str = this.value( 'moment', next && next.toString() )
			if ( !str ) throw new Error('Request moment is not defined')
			return new $mol_time_moment( str )
		}
		
		@ $mol_mem
		title() {
			const method = this.method().toUpperCase()
			const pathname = new URL( 'https://restmock.aspirity.com' + this.url() ).pathname
			return `${ method } ${ pathname }`
		}
	}

}
