// DOM Queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMssg = document.querySelector('.update-mssg')
const room = document.querySelector('.chat-forum')

// add new chat
newChatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = newChatForm.message.value.trim()
  chatForum
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err))
})

// update name
newNameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const newName = newNameForm.name.value.trim()

  chatForum.updateName(newName)
  newNameForm.reset()

  updateMssg.innerText = `Name updated to ${newName}`
  setTimeout(() => (updateMssg.innerText = ''), 3000)
})

// update the forum chat
room.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear()
    chatForum.updateForum(e.target.getAttribute('id'))
    chatForum.getChats((chat) => chatUI.render(chat))
  }
})

//check local storage for username
const username = localStorage.username ? localStorage.username : 'Anon'

// class instances
const chatUI = new ChatUI(chatList)
const chatForum = new Forum('gaming', username)

// gets chat and render
chatForum.getChats((data) => chatUI.render(data))
