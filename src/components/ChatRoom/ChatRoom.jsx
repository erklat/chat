function ChatRoom() {

    const dummy = useRef()
    
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    
    const [messages] = useCollectionData(query, {idField: 'id'})
    
    const [formValue, setFormValue] = useState('');
    
    const sendMessage = async(e) => {
       
      e.preventDefault();
    
      const { uid, photoURL } = auth.currentUser;
    
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestap(),
        uid,
        photoURL
      })
      
      setFormValue('');
    
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    
          <div ref={dummy}></div>
        
        </main>
    
        <form onSubmit={sendMessage}>
    
         <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
    
         <button type="submit">📨</button>
    
        </form>
    
        </>
    )
    
    }
    