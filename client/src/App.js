import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {

  const [ contactName, setContactName ] = useState('');
  const [ contactNum, setContactNum ] = useState('');
  const [ contactList, setContactList ] = useState([]);
  const [ updatedNum, setUpdatedNum ] = useState('');
  const [ value, setValue ] = useState('');
  const [ disable, setDisable ] = useState(true);

  useEffect(() => {
    const getInterval = setInterval(() => {
      Axios.get('https://kaimarcelo.online/contacts/get').then((response) => {
      setContactList(response.data)
      }, 100);
      return () => clearInterval(getInterval);
    })
  }, [])

  const addContact = () => {
    Axios.post('https://kaimarcelo.online/contacts/post', {
      contactName: contactName,
      contactNum: contactNum
    }).then(Axios.get('https://kaimarcelo.online/contacts/get').then((response) => {
      setContactList(response.data)
    }));
  }

  const deleteContact = (contact) => {
    Axios.delete(`https://kaimarcelo.online/contacts/delete/${contact}`)
        setContactList(contactList.filter((val) => {
          return val.id !== contact
        }))
  }

  const updateBtn = (id) => {
    contactList.filter((val) => {
      return val.id === id }) ? setValue(id) : setValue('');
  }

  const saveBtn = (id) => {
    setDisable(true)
    setValue('')
    Axios.put('https://kaimarcelo.online/contacts/update', {
      id: id,
      contactNum: updatedNum
    })
  }

  return (
    <div className="App">

      <label htmlFor="contactName">Contact Name:</label>
      <input type="text" id="contactName" onChange={(e) => setContactName(e.target.value)}/><br/>

      <label htmlFor="contactNumber">Number:</label>
      <input type="text" id="contactNumber" onChange={(e) => setContactNum(e.target.value)}/><br/>

      <button onClick={addContact}>Add Contact</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
        {contactList.map((val) => {
          return (
            <tr id={val.id} key={val.id}>
              <td key={val.contactName}>{val.contactName}</td>
              <td key={val.contactNum}>
                <input type="text" 
                defaultValue={val.id === value ? null : val.contactNum} 
                disabled={val.id === value ? !disable : disable}
                onChange={(e) => setUpdatedNum(e.target.value)}/>
              </td>
              <td><button onClick={() => deleteContact(val.id)}>Delete</button></td>
              <td><button onClick={() => updateBtn(val.id)}>Update</button></td>
              { val.id === value ? 
                <td><button onClick={() => saveBtn(val.id)}>Save</button></td> 
                : 
                null
              }
            </tr>
          )
        })}
      </tbody>
      </table>
    </div>

  );
}

export default App;
