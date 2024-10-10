import { createSlice } from "@reduxjs/toolkit";
import {
	fetchContacts,
	addContact,
	deleteContact,
	updateContact,
} from "./operations";

const initialState = {
	contacts: [],
	filter: "",
	isLoading: false,
	error: null,
};

const handlePending = (state) => {
	state.isLoading = true;
};

const handleRejected = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
	alert(action.payload);
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		setFilter(state, action) {
			state.filter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.contacts = action.payload;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.contacts.push(action.payload);
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.contacts = state.contacts.filter(
					(contact) => contact.id !== action.payload.id
				);
			})
			.addCase(updateContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const updatedContactIndex = state.contacts.findIndex(
					(contact) => contact.id === action.payload.id
				);
				if (updatedContactIndex !== -1) {
					state.contacts[updatedContactIndex] = action.payload;
				}
			})
			.addMatcher((action) => action.type.endsWith("/pending"), handlePending)
			.addMatcher(
				(action) => action.type.endsWith("/rejected"),
				handleRejected
			);
	},
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
