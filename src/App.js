import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Title from './components/Title';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import './App.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts.`)
      :
        this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter),
    );
  };

  render() {
    const { filter } = this.state;
    const { addContact, changeFilter, deleteContact, visibleContacts } = this;
  
    console.log(this.state.contacts);
    return (
      <div className="container">
        <h1 className="visually_hidden">Phonebook</h1>

        <Title title="Phonebook" />
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default App;