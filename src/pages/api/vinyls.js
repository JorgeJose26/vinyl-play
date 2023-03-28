const vinyls = [
    {
        id: 1,
        artist: 'Led Zeppelin',
        album: 'IV',
        image: 'https://images-na.ssl-images-amazon.com/images/I/81Us%2B0xpV-L._AC_SL1500_.jpg',
        releaseDate: '1971-11-08'
    },
    {
        id: 2,
        artist: 'Pink Floyd',
        album: 'The Dark Side of the Moon',
        image: 'https://images-na.ssl-images-amazon.com/images/I/71RCCT2C-PL._AC_SL1500_.jpg',
        releaseDate: '1973-03-01'
    },
    {
        id: 3,
        artist: 'The Beatles',
        album: 'Abbey Road',
        image: 'https://images-na.ssl-images-amazon.com/images/I/71q9fVjp-FL._AC_SL1500_.jpg',
        releaseDate: '1969-09-26'
    }
]

export default (req, res) => {
    res.status(200).json(vinyls)
}
