import mysql from 'mysql2'
import { resourceUsage } from 'process'
import dotenv from 'dotenv'

dotenv.config()

// const pool = mysql.createPool({
//     // host: '127.0.0.1',
//     host: 'localhost',
//     user: 'root',
//     password: 'wildlife',
//     database: 'notes_app'
// }).promise()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}

export async function getNote(id) {
    const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id])
    return rows[0]
}

export async function createNote(title, content) {
    const [result] = await pool.query(
        `INSERT INTO notes (title, content)
        VALUES (?, ?)`,
        [title, content]
    )
    // return {
    //     id: result.insertId,
    //     title,
    //     content
    // }

    const id = result.insertId
    return getNote(id)
}

const notes = await createNote('test', 'test')

console.log(notes)



// create database notes_app;
// use notes_app;

// create table notes (
// id integer primary key auto_increment,
// title varchar(255) NOT NULL,
// contents text not null,
// created timestamp not null default NOW()
// );

// INSERT into notes (title, contents)
// values
// ("first note", "my first note"),
// ("secone note", "my second note");