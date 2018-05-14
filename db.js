const mysql = require('mysql');

class Database {
	constructor() {
		this.connection = null; // our singleton connection
	}

	getConnection() {
		if (!this.connection) {
			this.connection = mysql.createConnection({
				host: "localhost",
				user: "notesUser",
				password: "admin",
				database: "notes_db"
			});
		}
		return this.connection;
	}

	endConnection() {
		this.connection.end();
		this.connection = null;
	}
}

const db = new Database();

module.exports = db;