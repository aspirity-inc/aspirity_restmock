namespace $.$$ {

	export class $aspirity_restmock_request_list extends $.$aspirity_restmock_request_list {
		
		@ $mol_mem
		links() {
			return this.request_ids().map(id => this.Link( id ))
		}

	}

}
