import * as mongoose from 'mongoose';
import { IProject } from '../interfaces/IProject';

export interface IProjectModel extends IProject, mongoose.Document {}

export const projectSchema = new mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	authors: String,
	name: String,
	repository: String,
	description: String,
	tags: String,
	status: { type: String, default: 'suggested'}
});

export const Project: mongoose.Model<IProjectModel> = mongoose.model<IProjectModel>('Project', projectSchema);
