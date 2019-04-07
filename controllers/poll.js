//core node modules
const path = require('path');

const Poll = require('../models/poll');

module.exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

module.exports.getCreatePoll = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'create-poll.html'));
};

module.exports.postCreatePoll = (req, res, next) => {
    const {title, question, description, options} = req.body;

    const poll = new Poll(title, question, description, options);
    poll.save()
        .then(result => {
            const pollId = result.insertedId;
            res.redirect(`/poll/${pollId}`);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getPoll = (req, res, next) => {
    Poll.getPollById(req.params.id)
        .then(poll => {
            let vote;
            if(req.cookies.vote)
                vote = JSON.parse(req.cookies.vote);
            
            res.render('poll', {poll: poll, vote: vote});
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.postVote = (req, res, next) => {
    const selectedOption = req.body.pollOption;
    const pollId = req.params.id;

    Poll.postVote(pollId, selectedOption)
        .then(result => {
            const val = JSON.stringify({voted: true, option: selectedOption});
            res.cookie('vote', val, {maxAge: 2.592e+9, httpOnly: true, path: `/poll/${pollId}`});
            res.send('Your Vote Has Been Recorded');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getStats = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'stats.html'));
};

module.exports.getStatsAsync = (req, res, next) => {
    Poll.getPollById(req.params.id)
        .then(poll => {
            res.json(poll);
        })
        .catch(err => {
            console.log(err);
        });
};