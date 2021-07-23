namespace $ {

	export class $aspirity_restmock_server_sync_db extends $mol_object2 {

		@ $mol_mem
		db() {
			return new $node.pg.Pool({
				connectionString: process.env.DATABASE_URL,
				// ssl: { rejectUnauthorized: false },
				ssl: false,
			})
		}
		
		@ $mol_fiber.method
		query( query: string , params: string[] = [] ) {
			const db = this.db()
			const func = $mol_fiber_sync( () => db.query( query , params ) )
			const res = func()
			return res
		}
		
		@ $mol_fiber.method
		connect() {
			const db = this.db()
			const connect = $mol_fiber_sync( () => db.connect() )
			connect()
		}
		
		
		@ $mol_fiber.method
		init_table() {
			return this.query(`
				CREATE TABLE IF NOT EXISTS store (
					key         varchar(255) UNIQUE NOT NULL,
					value       jsonb
				);
			`)
		}
		
		@ $mol_fiber.method
		get( key: string ) {
			const res = this.query( `SELECT value FROM store WHERE key = $1::text` , [ key ] )
			return res
		}
		
		@ $mol_fiber.method
		put( key: string , value: any ) {
			const res = this.query(`
				INSERT INTO store ( key, value )
				VALUES( $1::text, $2::json )
				ON CONFLICT( key ) DO UPDATE
				SET value = $2::json;
				`,
				[ key , value ]
			)
			return res
		}

	}

}
