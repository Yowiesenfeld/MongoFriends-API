

const router = require('express').Router();
const thoughtController = require('../controllers/thought-controller');

router.route('/thoughts').get(thoughtController.getAllThoughts).post(thoughtController.createThought);

router.route('/thoughts/:thoughtId').get(thoughtController.getThoughtById).put(thoughtController.updateThought).delete(thoughtController.deleteThought);

router.route('/thoughts/:thoughtId/reactions').post(thoughtController.createReaction).delete(thoughtController.deleteReaction);

module.exports = router;
