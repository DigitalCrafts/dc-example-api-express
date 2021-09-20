const debug = require('debug')('setupTask');
const db = require('../models');

/**
 * Setup role if it does not exist
 * @param {string} name The name of the role to check for
 * @returns {Promise} A promise that resolves when the role is created
 */
function setupRole(name) {
  debug('Checking for %s role', name);
  return db.Role.findOne({ where: { name } }).then((role) => {
    if (!role) {
      debug('No %s role found', name);
      db.Role.create({ name }).then(() => debug('%s role created', name));
    }
  });
}

/**
 * setup required system roles
 * @returns {Promise<[Role, Role]>} A promise that resolves when the roles are created
 */
function setupRoles() {
  debug('Checking for required system roles');
  const adminRoleCheck = setupRole('Admin');
  const userRoleCheck = setupRole('User');
  return Promise.all([adminRoleCheck, userRoleCheck]);
}

/**
 *
 */
function setupAdminUser() {
  debug('Checking for admin user');
  return db.User.findOne().then(async (user) => {
    if (!user) {
      debug('No users found. Attempting to create first user as admin user.');
      const email = process.env.ADMIN_EMAIL || 'admin';
      const password = process.env.ADMIN_PASSWORD;
      if (!password) {
        throw new Error(
          'No admin password found. Please set ADMIN_PASSWORD environment variable.',
        );
      }
      const role = await db.Role.findOne({ where: { name: 'Admin' } });
      const newUser = db.User.create({
        name: 'Admin',
        email,
        password,
        RoleId: role.id,
      });
      console.log(
        'Admin user created as %s and password from ADMIN_PASSWORD environment variable',
        newUser.email,
      );
    }
  });
}

/**
 * run setup tasks
 *  - setup roles
 *  - setup admin user
 */
async function setupTask() {
  await setupRoles();
  await setupAdminUser();
}

module.exports = setupTask;
