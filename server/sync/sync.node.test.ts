namespace $ {
	$.$aspirity_restmock_server_sync_bootstrap = ()=> {}
	$mol_test({
		'Completed'() {
			$mol_ambient({}).$mol_log3_done({
				place: '$mol_test' ,
				message: 'All tests passes',
			})
			process.exit(0)
		}
	})
}
