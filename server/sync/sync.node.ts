namespace $ {

	// TODO cannot import WebSocket Client type
	type SocketClient = typeof $node.ws.Server.prototype.clients extends Set<infer Client> ? Client : never

	export class $aspirity_restmock_server_sync extends $mol_server {

		@ $mol_mem
		db() {
			return new $aspirity_restmock_server_sync_db
		}

		@ $mol_mem
		socket() {
			return new $node.ws.Server({
				server : this.http() ,
				perMessageDeflate: {
					zlibDeflateOptions: {
						chunkSize: 1024,
						memLevel: 7,
						level: 3
					},
					zlibInflateOptions: {
						chunkSize: 10 * 1024
					},
				}
			})
		}

		@ $mol_mem
		watch( next?: Map<SocketClient, Set<string>> ) {
			return next ?? new Map
		}

		client_send( client: SocketClient , key: string , value: any ) {
			client.send(JSON.stringify([ key , value ]))
		}

		socket_connection( client: SocketClient) {
			client.on( 'message' , $mol_fiber_root( ( json: string ) => this.client_message( client , json ) ) )
			client.on( 'close' , $mol_fiber_root( () => this.client_close( client ) ) )
			client.on( 'error' , $mol_fiber_root( ( error: Error ) => this.client_error( client , error ) ) )
		}

		@ $mol_fiber.method
		client_message( client: SocketClient , message: string | Buffer ) {
			let data
			const json = message?.toString() ?? ''

			try {
				if (json === '') return
				data = JSON.parse(json.toString())
				if (!Array.isArray(data)) return
			} catch (ex) {
				console.error(ex, json)
				return
			}

			const [ key , value ] = data

			this.client_send(
				client ,
				key ,
				value ? this.put( client , key , value ) : this.get( client , key )
			)
		}

		@ $mol_fiber.method
		client_close( client: SocketClient ) {
			const watch = this.watch()
			watch.delete( client )
		}

		@ $mol_fiber.method
		client_error( client: SocketClient , error: Error ) {
			console.error(error)
		}

		@ $mol_fiber.method
		get( client: SocketClient , key: string ) {
			const watch = this.watch()
			if ( !watch.get( client ) ) watch.set( client , new Set )
			watch.get( client ).add( key )

			const res = this.db().get( key )
			return res.rows[0] ? res.rows[0].value : null
		}

		@ $mol_fiber.method
		put( client: SocketClient , key: string, value: any ) {
			const prev = this.get( client , key ) ?? {}

			const next_value = this.merge( prev , value )

			this.db().put( key , next_value )

			for ( const [ watcher , keys ] of this.watch() ) {
				if ( watcher === client ) continue
				if ( !keys.has( key ) ) continue
				this.client_send( watcher , key , next_value )
			}

			return next_value
		}

		like_delta( value: any ) {
			if( !value ) return false
			if( !Array.isArray( value.stamps ) ) return false
			if( !Array.isArray( value.values ) ) return false
			return true
		}

		merge( left: any , right: any ) {
			if( this.like_delta( left ) && this.like_delta( right ) ) {
				const store = $hyoo_crowd_graph.make()
				store.apply( left ).apply( right )
				return store.delta()
			} else {
				return Object.assign( left, right )
			}
		}

		port() {
			return Number( process.env.PORT ?? 3000 )
		}

		@ $mol_fiber.method
		start() {
			this.socket().on( 'connection' , $mol_fiber_root( this.socket_connection.bind(this) ) )
		}

	}

	export function $aspirity_restmock_server_sync_bootstrap() {
		if ( $mol_state_arg.value( '--start' ) === '' ) {
			const server = new $aspirity_restmock_server_sync
			server.db().connect()
			server.db().init_table()
			server.start()
		}
	}

	$mol_fiber_root( $aspirity_restmock_server_sync_bootstrap )()

}
