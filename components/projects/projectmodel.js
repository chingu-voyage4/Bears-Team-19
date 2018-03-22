const mongoose = require('mongoose');

// Define the schema
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: String,
  authorId: Schema.Types.ObjectId,
  authorName: String,
  keywords: [String],
  description: String,
  lastSaved: Date,
  lastPublished: Date,
  isPublic: Boolean,
});

// Define the model
const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
