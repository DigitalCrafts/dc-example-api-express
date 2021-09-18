const express = require('express');
const authenticateUser = require('../../controllers/users/authenticateUser');
const getUsers = require('../../controllers/users/getUsers');
const registerUser = require('../../controllers/users/registerUser');
const hasRole = require('../../middleware/hasRole');

const router = express.Router();

/**
 * GET /api/v1/users
 * @summary Get all users
 * @tags Users
 * @security Bearer
 * @param {RegisterUserDto} request.body.required
 * @return {array<User>} 200 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 409 - Conflict Response (user already exists) - application/json
 */
router.get('/', hasRole('Admin'), getUsers);

/**
 * @typedef {object} AuthenticateUserDto
 * @property {string} email.required email address
 * @property {string} password.required password
 */

/**
 * @typedef {object} TokenResponse
 * @property {string} token JWT string
 */

/**
 * POST /api/v1/users/authentication
 * @summary Authenticate a user and return a JWT token
 * @tags Users
 * @security
 * @param {AuthenticateUserDto} request.body.required
 * @return {TokenResponse} 200 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 401 - Invalid Password
 * @return {ErrorResponse} 404 - Not Found Response
 */
router.post('/authentication', authenticateUser.validate, authenticateUser);

/**
 * @typedef {object} RegisterUserDto
 * @property {string} email.required email address
 * @property {string} password.required password
 * @property {string} name.required Full name
 */

/**
 * POST /api/v1/users/registration
 * @summary Register a new user
 * @tags Users
 * @security
 * @param {RegisterUserDto} request.body.required
 * @return {User} 201 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 409 - Conflict Response (user already exists) - application/json
 */
router.post('/registration', registerUser.validate, registerUser);

// GET /api/v1/users/:id
// GET /api/v1/users/search

module.exports = router;
