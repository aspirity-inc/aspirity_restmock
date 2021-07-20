namespace $ {
	
	export class $aspirity_restmock_filter extends $mol_store<{
		requests: string[]
	}> {

		requests( next ?: string[] ) {
			return this.value( 'requests' , next ) ?? []
		}
		
	}

}
