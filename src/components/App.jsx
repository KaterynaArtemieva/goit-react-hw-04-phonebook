import { useEffect, useState } from 'react';
import { Box } from './Box/Box.styled';
import { PhoneBook } from './PhoneBook/PhoneBook.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const { name, number } = newContact;
    if (
      contacts.some(contact => contact.name === name) ||
      contacts.some(contact => contact.number === number)
    ) {
      alert(`This one is already in contacts`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Box>
      <PhoneBook>
        <ContactForm addContact={addContact} />
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          items={getFilteredContacts()}
          deleteContact={deleteContact}
        />
      </PhoneBook>
    </Box>
  );
};
