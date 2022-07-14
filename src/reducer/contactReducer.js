const initialState = [
  {
    id: 0,
    name: "Raman",
    email: "email@email.com",
    gender: "female",
    status: "inactive",
  },
  {
    id: 1,
    name: "chaman",
    email: "test@test.com",
    gender: "female",
    status: "active",
  },
  {
    id: 2,
    name: "shreyas",
    email: "shreyas@bhuva.com",
    gender: "male",
    status: "active",
  },
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      console.log("contactUp----->>", contactUpdate);
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, email: null, gender: null, status: null }];
      return state;
    default:
      return state;
  }
};
