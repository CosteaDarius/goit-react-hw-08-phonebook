import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../redux/contactsSlice';
import '../styles/contacts.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <div className="contacts-container">
      <h2>Your Contacts</h2>

      <form className="contacts-form" onSubmit={handleAddContact}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        <button type="submit">Add Contact</button>
      </form>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            {contact.name} - {contact.number}
            <button onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
