

module.exports = function(app) {
    const UserCtrl = require('../controller/UserController');
    const TokenCtrl = require('../controller/TokenController');
    const VerifyUserMiddleware = require('../middleware/user.verify.middleware');
    const ValidationMiddleware = require('../middleware/auth.validation.middleware');
    const PermissionMiddleware = require('../middleware/user.permission.middleware');
    // todoList Routes
    app.route('/user')
      .get([
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.miniumPermissionLevelRequired(2),
        UserCtrl.get
      ])
      .post(UserCtrl.create);
  
    app.route('/user/:id')
      .get([
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.miniumPermissionLevelRequired(3),
        PermissionMiddleware.specificUserRequired,
        UserCtrl.detail
      ])
      .put([
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.miniumPermissionLevelRequired(3),
        PermissionMiddleware.specificUserRequired,
        UserCtrl.update])
      .delete([
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.miniumPermissionLevelRequired(3),
        PermissionMiddleware.specificUserRequired,
        UserCtrl.delete
      ]);
    
    app.route('/user/auth')
    .post([
      VerifyUserMiddleware.hasAuthValidFields,
      VerifyUserMiddleware.isPasswordAndUsernameMatch,
      UserCtrl.login,
    ]);

    app.route('/refresh')
    .get(TokenCtrl.refreshToken);
  };