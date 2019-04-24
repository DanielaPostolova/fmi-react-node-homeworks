import { Project } from "../../db/schemas/ProjectSchema";
import express = require("express");
import { ObjectId } from "mongodb";
import { validateUrl } from "../../validation";


export default {
	getAll: (req: express.Request, res: express.Response) => {
		Project.find((err, proj) => {
			if (err) {
				return res.send([]);
			}
			return res.status(200).send(proj);
		});
	},

	get: (req: express.Request, res: express.Response) => {
		const { id } = req.params;
		Project.findById(id, (err, proj) => {
			if (err) {
				return res.status(500).send(err);
			}
			if (!proj) {
				return res.status(404).send("Project not found!");
			}
			return res.status(200).send(proj);
		});
	},

	delete: (req: express.Request, res: express.Response) => {
		const { id } = req.params;
		Project.deleteOne({ "_id": new ObjectId(id) }, (err) => {
			if (err) {
				return res.status(500).send(err);
			}
			return res.send(204);
		})
	},

	update: (req: express.Request, res: express.Response) => {
		const { id } = req.params;
		let { status, repository } = req.body;

		if (status !== 'suggested' && status !== 'approved') {
			status = 'suggested';
		}

		if (repository && !validateUrl(repository)) {
			return res.status(400).send("Invalid repository url!")
		}

		Project.findByIdAndUpdate({ "_id": new ObjectId(id) }, req.body, { new: true }, (err, proj) => {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(proj);
		})
	},

	create: (req: express.Request, res: express.Response) => {
		let { authors, name, repository, description, tags, status } = req.body;

		if (status !== 'suggested' && status !== 'approved') {
			status = 'suggested';
		}

		if (!validateUrl(repository)) {
			return res.status(400).send("Invalid repository url!")
		}

		let p = new Project({ authors, name, repository, description, tags, status });
		p.save((err, proj) => {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(201).send(proj);
		})
	}
}
