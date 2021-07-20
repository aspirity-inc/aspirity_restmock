namespace $.$$ {

	export class $aspirity_restmock extends $.$aspirity_restmock {

		request_arg( id : string ) {
			return { request : id }
		}
		
		@ $mol_mem_key
		request_title( id : string ) {
			return this.domain().http_request( id )!.url()
		}
		
		@ $mol_mem
		request_links() {
			return this.domain().filter().requests().map(id => this.Request_link( id ))
		}

	}

}
