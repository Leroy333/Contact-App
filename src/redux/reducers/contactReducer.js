const initialState = [
    {
        id: 0,
        name: 'Ruslan Dzhambekov',
        number: 89139718677,
        email: 'study0000@study.utmn.ru'
    },
    {
        id: 1,
        name: 'test Name',
        number: 12345678910,
        email: 'study1111@study.utmn.ru'
    }
];
const contactReducer = (state=initialState, action)=>{
    switch (action.type) {
        case "ADD_CONTACT":
            state = [...state, action.payload];
            return state;
        case "UPDATE_CONTACT":
            const updateState = state.map((contact)=>contact.id === action.payload.id? action.payload: contact);
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const filterContacts = state.filter((contact)=> contact.id !== action.payload && contact);
            state = filterContacts;
            return state;

        default:
            return state;

    }
}

export default contactReducer;