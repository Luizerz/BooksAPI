import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #books = new Map()

    list(search = '') {
        return Array.from(this.#books.entries())
        .map((booksArrayu) => {
            const id = booksArrayu[0]
            const data = booksArrayu[1]
            return {
                id,
                ...data
            }
        })
        .filter( book => {
            if (search) {
                return book.title.toLowerCase().includes(search.toLowerCase())
            }
            return true
        })
    }

    create(book) {
        const videoID = randomUUID()
        this.#books.set(videoID, video)
    }

    update(id, video) {
        this.#books.set(id, video)
    }

    delete(id) {
        this.#books.delete(id)
    }
}