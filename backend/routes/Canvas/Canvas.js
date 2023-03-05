const CanvasInfo = require("../../models/Canvas/CanvasModel");
const router = require("express").Router();

/**
* POST request with a canvas object in the body will create new canvas information
*/
router.route('/add').post((req, res) => {
    const courses = req.body.courses;
    const id = req.body.id;
    const isCanvasLinked = req.body.isCanvasLinked;
    const dateLastLinked = req.body.dateLastLinked;
    const token = req.body.token

    const canvasinfo = new CanvasInfo({
        courses,
        id,
        isCanvasLinked,
        dateLastLinked,
        token
    });

    canvasinfo.save()
        .then(() => res.json('New Info added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});


/**
 * GET request with an id field will send the Canvas Information object as JSON
 */
router.route('/get/:id').get((req, res) => {
    CanvasInfo.findById(req.params.id)
        .then(canvasinfo => res.json(canvasinfo))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * PUT request with an id field will replace the current user data with the request body
 */
router.route('/update/:id').put((req, res) => {
    CanvasInfo.findById(req.params.id)
        .then(canvasinfo => {
            if (canvasinfo.status === 404) {
                return res.status(404).send("No user found with id " + req.params.id);
            }
            canvasinfo.courses = req.body.courses;
            canvasinfo.id = req.body.id;
            canvasinfo.isCanvasLinked = req.body.isCanvasLinked;
            canvasinfo.dateLastLinked = req.body.dateLastLinked;
            canvasinfo.token = req.body.token;
        });
});

/**
 * DELETE request with an id field will delete the canvas information associated with that id
 */
router.route('/delete/:id').delete((req, res) => {
    CanvasInfo.findbyIdAndDelete(req.params.id)
        .then(res.send("Successfully Deleted Canvas Information for user " + req.params.id))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Express Router instance containing all /canvas routes
 */
module.exports = router;