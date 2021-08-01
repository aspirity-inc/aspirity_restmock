namespace $.$$ {

	export class $aspirity_restmock extends $.$aspirity_restmock {
		
		@ $mol_mem_key
		request( id: string ) {
			return this.domain().http_request( id )
		}
		
		@ $mol_mem
		request_links() {
			return this.domain().filter().requests().map(id => this.Request_link( id ))
		}

	}

}
