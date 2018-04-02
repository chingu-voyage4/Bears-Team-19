const mongoose = require('mongoose');

// Define the schema
const { Schema } = mongoose;

const ProjectVersionSchema = new Schema({
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
}, {
  timestamps: true,
});

const ProjectSchema = new Schema({
  draft: ProjectVersionSchema,
  published: ProjectVersionSchema,
});

// Define the model
const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
