const mongoose = require("mongoose");

exports.makeDb = () => {
	mongoose.set("useCreateIndex", true);
	mongoose.connect(
		`mongodb+srv://rihana:rihana@cluster0.fzt7a.mongodb.net/recipe-app?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	);
	mongoose.set("useFindAndModify", false);
}