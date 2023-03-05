const User = require("../../models/user/userModel");
const router = require("express").Router();

const { login } = require('../../controllers/user/user')
/**
 * POST request adds new user to data base upon login
 */
router.post('/login', login)

/**
 * GET request with an id field will send the User object as JSON
 */
router.route('/get/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * PUT request with an id field will replace the current user data with the request body
 */
router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user.status === 404) {
                return res.status(404).send("No User to Update");
            }
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.id = req.body.id;
            user.sub = req.body.sub;
        });
});

/**
 * DELETE request with an id field will delete the user associated with that id
 */
router.route('/delete/:id').delete((req, res) => {
    User.findbyIdAndDelete(req.params.id)
        .then(res.send("Successfully Deleted User"))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Express Router instance containing all /user routes
 */
module.exports = router;