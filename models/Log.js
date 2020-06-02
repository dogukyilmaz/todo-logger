const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	todo: {
		type: String,
		trim: true,
		required: [true, 'Todo input is required!'],
		unique: true,
	},
	priority: {
		type: String,
		default: 'low',
		enum: ['low', 'moderate', 'high'],
	},
	user: {
		type: String,
		trim: true,
		required: [true, 'User is required!'],
	},
	done: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Log', LogSchema);
