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
		request() {
			const id = $mol_guid()
			const request = this.domain().http_request( id )
			request.moment( new $mol_time_moment )

			const filter = this.domain().filter()
			filter.requests( [ ...filter.requests() , request.id() ] )

			return request
		}
		
		@ $mol_fiber.method
		handle_request(
			req : InstanceType< typeof $node.http.IncomingMessage > ,
			res : InstanceType< typeof $node.http.ServerResponse > ,
		) {
			const request = this.request()

			try {

				request.url( req.url )
				request.method( req.method )
				request.headers( req.headers as any )
				request.rawHeaders( req.rawHeaders )
				
				const body = this.req_body_receive( req )
				const encoding = req.headers['content-encoding']
				const decoded = encoding && body
					? this.req_body_decode( body , encoding ).toString()
					: body.toString()

				request.rawBody( decoded )

			} catch ( unknown ) {

				if ( unknown instanceof Error ) request.fail( unknown )
				else throw unknown

			} finally {

				res.end()

			}

		}
		
		@ $mol_fiber.method
		req_body_receive( req : InstanceType< typeof $node.http.IncomingMessage > ) {
			const func = $mol_fiber_sync( async () => {
				const buffers = []

				for await ( const chunk of req ) {
					buffers.push( chunk )
				}
				
				return Buffer.concat(buffers)
			} )
			
			return func()
		}
		

		@ $mol_fiber.method
		req_body_decode( buffer: Buffer , encoding: string ) {
			const func = $mol_fiber_sync( () => $node['http-encoding'].decodeBuffer( buffer , encoding ) )
			return func()
		}
		


		@ $mol_fiber.method
		listen() {
			this.server().listen( this.port() , () => console.log('server started!!!!!!!!!!!!!!!!!!!!!!!!' , this.port() ) )
		}
		
		port() {
			return Number( process.env.ASPIRITY_RESTMOCK_SERVER_PORT ?? 3001 )
		}
		
	}

	export function $aspirity_restmock_server_bootstrap() {
		$mol_dom_context.localStorage.clear()

		if ( $mol_state_arg.value( '--start' ) === '' ) {
			const server = new $aspirity_restmock_server
			server.listen()
			// hjhj
		}
	}
	
	$mol_fiber_root( $aspirity_restmock_server_bootstrap )()
}
