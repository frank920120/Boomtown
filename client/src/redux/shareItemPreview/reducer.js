//actions
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';
const RESET_ITEM = 'RESET_ITEM';

//action creators
export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

export const resetItem = () => ({
  type: RESET_ITEM
});

//initialState
const initialState = {
  title: 'Name your item ',
  description: 'describe your item ',
  imageurl: 'https://via.placeholder.com/400x200.png?text=select+an+image',
  tags: [],
  itemowner: {
    fullname: 'Frank Fang',
    email: 'frankfang2014@hotmail.com'
  },
  created: new Date()
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return {
        ...state,
        ...action.payload
      };

    case RESET_ITEM:
      return {
        ...initialState
      };

    case RESET_IMAGE:
      return {
        ...state,
        imageurl: initialState.imageurl
      };

    default:
      return state;
  }
};
