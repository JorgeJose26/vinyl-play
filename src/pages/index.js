import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '@/components/layouts/navBar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBContainer
} from 'mdb-react-ui-kit';

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

        <>
            <NavBar />



            <button onClick={shuffleVinyls}>Shuffle</button>
            <div>
                {genres.map(genre => (
                    <button key={genre} onClick={() => handleGenreFilter(genre)}>{genre}</button>
                ))}
                <button onClick={() => handleGenreFilter(null)}>Clear Filter</button>
            </div>


            <MDBContainer className='mt-12'>
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                    {vinyls.map(vinyl => (
                        <MDBCol>
                            <MDBCard className='w-100 h-100 p-4' key={vinyl.id} style={{ maxWidth: '540px' }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='4'>
                                        <MDBCardImage src={vinyl.image} alt={vinyl.album} fluid />
                                    </MDBCol>
                                    <MDBCol md='8'>
                                        <MDBCardBody>
                                            <MDBCardTitle>{vinyl.artist}</MDBCardTitle>
                                            <MDBCardText>
                                                {vinyl.album}
                                            </MDBCardText>
                                            <MDBCardText>
                                                <small className='text-muted'>{vinyl.releaseDate}</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>

        </>
    )
}

export default Vinyls
