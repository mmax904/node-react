const ErrorHandler = (err, req, res, next) => {
	err = req.app.get('env') === 'dev' ? err : {};
	const status = err.status || 500;
	const message = err.message || '';
	const errors = err.errors || err
	//For post request to workk with errors res.send on validator
	if(req.url.includes('/api/')) {
		res.status(status).json({
			data:[],
			errors,
			message,
		});
	} else {
		res.locals.status = status;
		res.locals.errors = errors;
		res.locals.message = message;
		res.status(status).render('error');
	}
	
}

export default ErrorHandler;