namespace $ {
	
	export class $aspirity_restmock_server extends $mol_object2 {
		
		@ $mol_mem
		domain() {
			return new $aspirity_restmock_domain
		}
		
		@ $mol_mem
		server() {
			return new $node.http.Server( $mol_fiber_root( this.handle_request.bind(this) ) )
		}
		
		@ $mol_fiber.method
		handle_request(
			req : InstanceType<typeof $node.http.IncomingMessage> ,
			res : InstanceType<typeof $node.http.ServerResponse> ,
		) {
			const id = $mol_guid()
			const request = this.domain().http_request( id )
			request.url( req.url )
			const filter = this.domain().filter()
			filter.requests( [ ...filter.requests() , id ] )
			res.end()
		}

		@ $mol_fiber.method
		listen() {
			this.server().listen( this.port() , () => console.log('server started' , this.port() ) )
		}
		
		port() {
			return Number( process.env.ASPIRITY_RESTMOCK_SERVER_PORT ?? 3001 )
		}
		
	}

	export function $aspirity_restmock_server_bootstrap() {
		if ( $mol_state_arg.value( '--start' ) === '' ) {
			const server = new $aspirity_restmock_server
			server.listen()
		}
	}
	
	$mol_fiber_root( $aspirity_restmock_server_bootstrap )()
}
