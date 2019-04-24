export interface IProject {
	createdAt: Date,
	authors: string,
	name: string,
	repository: string,
	description: string,
	tags?: string,
	status: string
}