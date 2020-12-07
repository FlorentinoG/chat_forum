class ChatUI {
  constructor(list) {
    this.list = list
  }
  clear(){
    this.list.innerHTML = ''
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    })
    const html = `
      <li class="list-group-item">
      <div class="username">${data.username}</div>
      <span class="message">${data.message}</span>
      <div class="time">${when}</div>
      </li>
    `

    this.list.innerHTML += html
  }
}
