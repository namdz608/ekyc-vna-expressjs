const jwt = require('jsonwebtoken')
const knex = require('../db/db')

const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.status(403).send({ message: "No token provided!" });

	try {
		const decoded = jwt.verify(token, 'namdz')
		req.actions=decoded.actions
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(403)
	}
}

const authorizeAction = (requiredAction) => {

	// Check if the user has the required role
	return (req, res, next) => {
		// Assuming the user role is retrieved from the authentication process
		const actions = req.actions;
		let arrayActions=actions.map(element => {
			return element.action
		});
		// Check if the user has the required role
		if (arrayActions.includes(requiredAction)) {
		  next(); // User has the required role, proceed to the next middleware or action
		} else {
		  res.status(403).send('Forbidden'); // User does not have the required role, send a forbidden response
		}
	  };
  };

module.exports = { verifyToken, authorizeAction }