const mongoose = require('mongoose');

// Check dev
const MONGO_LOCAL_URI = 'mongodb://localhost:27017/todo-logger';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_LOCAL_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected to localhost.`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
