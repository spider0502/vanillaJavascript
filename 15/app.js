const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')

const apiURL = 'https://api.lyrics.ovh'

//Search songs
function searchSongs(term) {
    fetch(`${apiURL}/suggest/${term}`)
        .then((res) => res.json())
        .then((data) => showData(data))
        .catch((err) => console.log(err))
}

//Show searched songs
function showData(data) {
    // let output = ''

    // data.data.forEach((song) => {
    //     output += `
    //         <li>
    //             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //             <button class="btn" data-aritst="${song.artist.name}"
    //                 data-songtitle="${song.title}">
    //                 Get Lyrics
    //             </button>
    //         </li>
    //     `
    // })

    result.innerHTML = `
        <ul class="songs">
            ${data.data.map((song) => (
        `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}"
                        data-songtitle="${song.title}">
                        Get Lyrics
                    </button>
                </li>
            `
    )).join('')
        }
        </ul>
    `
    console.log(data)
    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `
    } else {
        more.innerHTML = ''
    }
}

//Prev and next
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await res.json()

    showData(data)
}

//Get lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    const data = await res.json()

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
     `

    more.innerHTML = ''
}

//Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value.trim()

    if (searchTerm) {
        searchSongs(searchTerm)
    }
})

//Get lyrics button
result.addEventListener('click', (e) => {
    const clickEl = e.target

    if (clickEl.tagName === 'BUTTON') {
        const artist = clickEl.getAttribute('data-artist')
        const songTitle = clickEl.getAttribute('data-songtitle')

        getLyrics(artist, songTitle)
    }
})