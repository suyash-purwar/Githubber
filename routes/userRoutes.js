const router = express.Router();

router.post('getUserName', (req, res) => {
	console.log(req.body.name);
});

module.exports = router;
