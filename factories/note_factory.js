const db = require('../db');
const con = db.getConnection();

class Note_Factory {
	constructor() {
		// noop
	}

	_getNotePromise(id) {
		return new Promise((resolve, reject) => {
			let sql = "select * from note where id=?"
			con.query(sql, [id], function(err, result) {
				if (err) {
					reject(err);
				}
				else {
					resolve(JSON.stringify(result[0]));
				}
				// con.end();
			});
		});
	}

	getNote(id) {
		return this._getNotePromise(id);
	}

	createNote(title, content) {
		if (!title || !content) {
			throw "Title and content required.";
		}

		return new Promise((resolve, reject) => {
			let date_created = new Date().getTime();
			let sql =
				"insert into note (title, content, user_id, date_created) " +
				"values (?, ?, ?, ?)";
			console.log("date_created: " + date_created);

			con.connect(function(err){});
			con.query(sql, [title, content, 1, date_created], function(err, result) {
				if (err) {
					console.log("there was err " + err);
					reject(err);
				}
				else {
					let jsonResult = {
						id: result.insertId
					};
					resolve(jsonResult);
				}
			});
		});
	}
}


module.exports = Note_Factory;