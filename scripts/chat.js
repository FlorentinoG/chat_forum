class Forum {
  constructor(forum, username) {
    this.forum = forum
    this.username = username
    this.forums = db.collection('forums')
    this.unsub
  }
  //* add new chat
  async addChat(message) {
    // format a chat object
    const now = new Date()
    const chat = {
      message,
      username: this.username,
      forum: this.forum,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    }
    // save the chat object into firebase
    const response = await this.forums.add(chat)
    return response
  }
  //* setting up real-time listener to get new chats
  getChats(callback) {
    this.unsub = this.forums
      .where('forum', '==', this.forum)
      .orderBy('created_at')
      .onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // update ui
            callback(change.doc.data())
          }
        })
      })
  }
  //* update username
  updateName(username) {
    this.username = username
    console.log('name updated to:', username)
    localStorage.setItem('username', username)
  }
  //* update forum
  updateForum(forum) {
    this.forum = forum
    console.log('room updated to:', forum)
    if (this.unsub) {
      
      this.unsub()
    }
  }
}
