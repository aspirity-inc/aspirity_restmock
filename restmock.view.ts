namespace $.$$ {

	export class $aspirity_restmock extends $.$aspirity_restmock {
		
		@ $mol_mem_key
		request( id: string ) {
			return this.domain().http_request( id )
		}
		
		@ $mol_mem
		request_ids() {
			return this.domain().filter().requests()
		}
		
		@ $mol_mem
		arg_id() {
			return $.$mol_state_arg.value( 'id' )
		}
		
		@ $mol_mem
		request_current() {
			const id = this.arg_id()
			if ( !id ) throw new Error('Request not selected')
			return this.request( id )
		}
		
		@ $mol_mem
		request_title() {
			return this.request_current().title()
		}
		
		@ $mol_mem
		pages() {
			return this.arg_id() ? super.pages() : [ super.pages()[ 0 ] ]
		}

	}

}
