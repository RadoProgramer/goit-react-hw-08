import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchContacts,
	addContact,
	deleteContact,
} from "../../api/contactsAPI";

const initialState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchAllContacts = createAsyncThunk(
	"contacts/fetchAll",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchContacts();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const createContact = createAsyncThunk(
	"contacts/addContact",
	async (contact, { rejectWithValue }) => {
		try {
			const response = await addContact(contact);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeContact = createAsyncThunk(
	"contacts/deleteContact",
	async (id, { rejectWithValue }) => {
		try {
			await deleteContact(id);
			return id;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllContacts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAllContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchAllContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items.push(action.payload);
			})
			.addCase(createContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(removeContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter(
					(contact) => contact.id !== action.payload
				);
			})
			.addCase(removeContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default contactsSlice.reducer;
