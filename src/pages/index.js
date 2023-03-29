import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Vinyls = () => {
    const [vinyls, setVinyls] = useState([])
    const [genreFilter, setGenreFilter] = useState(null)

    useEffect(() => {
        const fetchVinyls = async () => {
            const res = await axios.get('https://api.discogs.com/database/search', {
                params: {
                    q: 'vinyl',
                    type: 'release',
                    format: 'vinyl',
                    per_page: 50,
                    sort: 'year',
                    sort_order: 'desc',
                    style: genreFilter // Include the style parameter if a genre filter is set
                },
                headers: {
                    'Authorization': 'Discogs token=jZEClhGWZPWoSpZmJQAVwEIXrjjNBppcGYGWPjcj'
                }
            })
            const data = res.data.results.map(result => ({
                id: result.id,
                artist: result.title.split(' - ')[0],
                album: result.title.split(' - ')[1],
                image: result.thumb,
                releaseDate: result.year
            }))
            setVinyls(data)
        }
        fetchVinyls()
    }, [genreFilter])

    // Shuffle the array of vinyls randomly
    const shuffleVinyls = () => {
        const shuffledVinyls = [...vinyls]
        for (let i = shuffledVinyls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = shuffledVinyls[i]
            shuffledVinyls[i] = shuffledVinyls[j]
            shuffledVinyls[j] = temp
        }
        setVinyls(shuffledVinyls)
    }

    // Handle genre filter button clicks
    const handleGenreFilter = (genre) => {
        if (genre === genreFilter) {
            setGenreFilter(null)
        } else {
            setGenreFilter(genre)
        }
    }

    // Define an array of possible genres
    const genres = ['Rock', 'Electronic', 'Jazz', 'Funk / Soul', 'Pop', 'Classical', 'Hip Hop', 'Reggae', 'Latin']

    return (
        <div>
            <h1>Vinyls</h1>
            <button onClick={shuffleVinyls}>Shuffle</button>
            <div>
                {genres.map(genre => (
                    <button key={genre} onClick={() => handleGenreFilter(genre)}>{genre}</button>
                ))}
                <button onClick={() => handleGenreFilter(null)}>Clear Filter</button>
            </div>
            <ul>
                {vinyls.map(vinyl => (
                    <li key={vinyl.id}>
                        <img src={vinyl.image} alt={vinyl.album} />
                        <p>{vinyl.artist}</p>
                        <p>{vinyl.album}</p>
                        <p>{vinyl.releaseDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Vinyls
