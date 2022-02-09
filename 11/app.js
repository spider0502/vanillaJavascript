const postsContainer = document.getElementById('post-container')
const loading = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 5
let page = 1

//Fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()

    return data
}

//Show posts in DOM
async function showPosts() {
    const posts = await getPosts()

    posts.forEach((post) => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `
        postsContainer.appendChild(postEl)
    })
}

//Show loader when scroll to bottom
function showLoading() {
    window.removeEventListener('scroll', handleScroll)

    loading.classList.add('show')

    setTimeout(() => {
        loading.classList.remove('show')

        setTimeout(() => {
            page++
            showPosts()
                .then(() => window.addEventListener('scroll', handleScroll))

        }, 300)
    }, 1000)
}

//Scroll callback
function handleScroll() {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
}

//Filter posts
function filterPosts(e) {
    const term = e.target.value.toUpperCase()
    console.log(term)
    const posts = document.querySelectorAll('.post')

    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body = post.querySelector('.post-body').innerText.toUpperCase()

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
}


//Initiation
showPosts()

window.addEventListener('scroll', handleScroll)
filter.addEventListener('input', filterPosts)

