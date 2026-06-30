const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const loadingMsg = document.getElementById('loadingMsg')
const errorMsg = document.getElementById('errorMsg')
const userCard = document.getElementById('userCard')
const userAvatar = document.getElementById('userAvatar')
const userName = document.getElementById('userName')
const userBio = document.getElementById('userBio')
const userRepos = document.getElementById('userRepos')
const userFollowers = document.getElementById('userFollowers')
const userFollowing = document.getElementById('userFollowing')
const userLink = document.getElementById('userLink')

function showLoading() {
  loadingMsg.classList.remove('hidden')
  errorMsg.classList.add('hidden')
  userCard.classList.add('hidden')
}

function showError(message) {
  loadingMsg.classList.add('hidden')
  errorMsg.classList.remove('hidden')
  errorMsg.textContent = message
  userCard.classList.add('hidden')
}

function showUser(data) {
  loadingMsg.classList.add('hidden')
  errorMsg.classList.add('hidden')

  userAvatar.src = data.avatar_url
  userName.textContent = data.name || data.login
  userBio.textContent = data.bio || 'No bio available'
  userRepos.textContent = `Repos: ${data.public_repos}`
  userFollowers.textContent = `Followers: ${data.followers}`
  userFollowing.textContent = `Following: ${data.following}`
  userLink.href = data.html_url

  // card was hidden, so trigger the fade-in on the next frame
  userCard.classList.remove('hidden')
  requestAnimationFrame(() => userCard.classList.add('visible'))
}

function setButtonBusy(isBusy) {
  searchBtn.disabled = isBusy
  searchBtn.textContent = isBusy ? 'Searching...' : 'Search'
}

async function fetchUser(username) {
  showLoading()
  setButtonBusy(true)
  userCard.classList.remove('visible')

  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found. Check the username.')
      }
      if (response.status === 403) {
        throw new Error('Rate limit hit, give it a minute and try again.')
      }
      throw new Error('Something went wrong. Try again.')
    }

    const data = await response.json()
    showUser(data)

  } catch (error) {
    // a failed fetch (offline, blocked, etc) throws a TypeError without
    // a useful message, so give that case its own wording
    if (error instanceof TypeError) {
      showError('Network error. Check your connection.')
    } else {
      showError(error.message)
    }
  } finally {
    setButtonBusy(false)
  }
}

function handleSearch() {
  const username = searchInput.value.trim()

  if (!username) {
    showError('Please enter a username.')
    return
  }

  fetchUser(username)
}

searchBtn.addEventListener('click', handleSearch)

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch()
})

// let people start typing right away
searchInput.focus()