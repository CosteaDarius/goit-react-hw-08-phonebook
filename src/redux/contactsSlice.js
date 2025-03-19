import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global';

// Fetch contacts
export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, { getState }) => {
  const state = getState();
  const token = state.auth.token;
  const response = await axios.get(`${API_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// Add contact
export const addContact = createAsyncThunk('contacts/add', async (contact, { getState }) => {
  const state = getState();
  const token = state.auth.token;
  const response = await axios.post(`${API_URL}/contacts`, contact, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// Delete contact
export const deleteContact = createAsyncThunk('contacts/delete', async (id, { getState }) => {
  const state = getState();
  const token = state.auth.token;
  await axios.delete(`${API_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;
