import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {

    async list(search) {
        let books
        if(search) {
            books = await sql`select * from bookshelf where title ilike ${'%' + search + '%'}`
        } else {
            books = await sql`select * from bookshelf`
        }
        return books
    }

    async create(book) {
        const bookID = randomUUID()
        const { title, description, genres, releaseYear } = book
        await sql`insert into bookshelf (id, title, description, genres, release_year) VALUES (${bookID}, ${title}, ${description}, ${genres}, ${releaseYear})`
    }

    async update(id, book) {
        const { title, description, genres, releaseYear } = book
        await sql`update bookshelf set title = ${title}, description = ${description}, genres = ${genres}, release_year = ${releaseYear} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from bookshelf where id = ${id}`
    }
}