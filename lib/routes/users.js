const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .then(users => res.send(users))
        .catch(next);
})

    .post('/', (req, res, next) => {
        new User(req.body)
            .save()
            .then(user => res.send(user))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        User.findById(id)
            .then(user => {
                if (!user) res.status(404).send(`${id} not found`);
                else res.send(user);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(user => {
                res.send(user);
            })
            .catch(next);
    });



module.exports = router;