const express = require('express');
const router = express.Router();

const pollController = require('../controllers/poll');

router.get('/', pollController.getIndex);

router.get('/create-poll', pollController.getCreatePoll);

router.post('/create-poll', pollController.postCreatePoll);

router.get('/poll/:id', pollController.getPoll);

router.post('/poll/:id', pollController.postVote);

router.get('/poll/:id/stats', pollController.getStats);

router.get('/poll/:id/statistics', pollController.getStatsAsync);

module.exports = router;