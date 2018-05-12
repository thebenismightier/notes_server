const mysql = require('mysql');

// todo replace this with some txman
const con = mysql.createConnection({
  host: "localhost",
  user: "notesUser",
  password: "admin",
  database: "notes_db"
});



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
			});
			con.end();
		});
	}

	getNote(id) {
		return this._getNotePromise(id);
	}

	createNote(title, content) {
		if (!title || !content) {
			throw "Title and content required.";
		}

		let result = { 
			title: title,
			content: content,

		}
		return result;
	}
}


module.exports = Note_Factory;