// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hello World!!')
//     return response.end()
// })

// server.listen(3333);

import fastify from "fastify"
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify({
    // logger: true
})

// const databaseMemory = new DatabaseMemory()
const database = new DatabasePostgres();

server.post('/bookshelf', async (request, response) => {
    const { title, description, genres, releaseYear } = request.body
    await database.create({
        title,
        description,
        genres,
        releaseYear
    })
    return response.status(201).send()
})

server.get('/bookshelf', async (request, response) => {
    const search = request.query.search
    const books = await database.list(search)
    console.log(books)
    return books
})

server.put('/bookshelf/:id', async (request, response) => {
    const bookID = request.params.id
    const { title, description, genres, releaseYear } = request.body
    await database.update(bookID, {
        title,
        description,
        genres,
        releaseYear
    })
    return response.status(204).send()
})

server.delete('/bookshelf/:id', async (request, response) => {
    const bookID = request.params.id
    await database.delete(bookID)
    return response.status(204).send()
})

server.get('/', () => {
    return 'Documentation'
});


server.listen({
    port: 3333,
}); 