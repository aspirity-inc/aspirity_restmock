namespace $ {
	
	export class $aspirity_restmock_request extends $mol_store<{
		url : string
	}> {

		id(): string {
			return this.$.$mol_fail( new Error( 'id is not defined' ) )
		}
		
		url( next ?: string ) {
			return this.value( 'url' , next ) ?? ''
		}
		
	}

}
