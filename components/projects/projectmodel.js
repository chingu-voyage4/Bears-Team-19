const mongoose = require('mongoose');

// Define the schema
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  keywords: [String],
  description: String,
  lastSaved: Date,
  lastPublished: Date,
  isPublic: Boolean,
});

// Define the model
const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
