namespace $.$$ {

	export class $aspirity_restmock_request_details extends $.$aspirity_restmock_request_details {

		headers() {
			return JSON.stringify(this.request().headers() , null, 2)
		}
		
		query() {
			return new URL( 'http://w.w' + this.request().url()).searchParams.toString()
		}
			
		body() {
			return this.request().rawBody()
		}

	} 

}
