namespace $ {
	
	export class $aspirity_restmock_domain extends $mol_store_shared {
		server = $mol_const('ws://localhost:3000')
		
		@ $mol_mem_key
		http_request( id: string ) {
			const request = this.sub( `request=${id}`, new $aspirity_restmock_request() )
			request.id = $mol_const( id )
			
			// const filter = this.filter()
			// filter.requests( [ ...filter.requests() , request.id() ] )
			return request
		}

		@ $mol_mem
		filter() {
			const filter = this.sub( 'filter' , new $aspirity_restmock_filter )
			return filter
		}
	}
	
}
