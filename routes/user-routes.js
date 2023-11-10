

const router = require('express').Router();
const userController = require('../controllers/user-controller');

router.route('/users').get(userController.getAllUsers).post(userController.createUser);

router.route('/users/:userId').get(userController.getUserById).put(userController.updateUser).delete(userController.deleteUser);

router.route('/users/:userId/friends/:friendId').post(userController.addFriend).delete(userController.removeFriend);

module.exports = router;
