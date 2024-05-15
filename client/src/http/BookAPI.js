import {$host, $authHost} from "./index";


export  const createAuthor = async (author)=> {
    const {data} = await $authHost.post('api/author', author)
    return data
}
export  const fetchAuthors = async ()=>
{
    const {data} = await $host.get('api/author', )
    return data
}

export  const createGenre = async (genre)=>
{
    const {data} = await $authHost.post('api/genre', genre)
    return data
}
export  const fetchGenres = async ()=>
{
    const {data} = await $host.get('api/genre',);
    return data
}

export  const createBook = async (book)=>
{
    const {data} = await $authHost.post('api/book', book)
    return data
}
export  const fetchBooks = async (genreId, authorId, limit, page)=>
{
    const {data} = await $host.get('api/book', {params:{genreId, authorId, limit, page}});
    return data
}

export  const fetchOneBook = async (id)=>
{
    const {data} = await $host.get('api/book/'+ id )
    return data
}

export  const deleteBook = async (id)=>{
    const {data} = await $authHost.delete('api/book/'+ id )
    return data
}

export  const changeBook = async (id, book)=>{
    const {data} = await $authHost.post('api/book/'+ id, book )
    return data
}
