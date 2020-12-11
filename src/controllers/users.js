const User = require('../models/user');
const Recipe = require('../models/recipe');

exports.getUsers = async (req, res) => {
	try {
    const users = await User.find();
    res.status(200).json({
      users
    });
	} catch(err) {
		res.status(500);
	}
}

exports.removeUser = async (req, res) => {
	try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(400).json({
        message: "User id needed",
      });
    }
		let deleted_user = await User.findOne({ _id: userId })
		await User.deleteOne({ _id: userId });
		await Recipe.deleteMany({ _id: deleted_user.createdRecipes })

    let users = await User.find({});

    res.status(200).json({
      message: "Successfully deleted",
      users,
    });
  } catch (err) {
    res.status(500);
  }
}