const initialState = {
  allPosts: [
    {
      userId: 0,
      id: 0,
      title: "hello",
    },
    {
      userId: 1,
      id: 1,
      title: "Shreyas",
    },
  ],
  userPosts: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ID":
      const userPosts = state.allPosts.filter(
        (post) => post.userId === action.payload
      );
      return { ...state, userPosts };

    case "ADD_POST":
      const prevAllPosts = [...state.allPosts];
      prevAllPosts.push(action.payload);
      state = { ...state, allPosts: prevAllPosts };
      return state;

    case "DELETE_POST":
      console.log(action);
      const index = state.allPosts.findIndex(
        (post) => post.id === action.payload
      );
      console.log("index-=====>>>>", index);
      if (index >= 0) {
        // splice
        const deleteState = [...state.allPosts];
        deleteState.splice(index, 1);
        return { ...state, allPosts: [...deleteState] };
      }
      return state;

    case "UPDATE_POST":
      // debugger;
      const updatePost = [...state.allPosts];
      const postUpdate = updatePost.findIndex(
        (post) => post.id === action.payload.id
      );
      console.log("action-->>>", action.payload);
      updatePost[postUpdate] = action.payload;
      return { ...state, allPosts: [...updatePost] };

    case "RESET_POST":
      state = [{ title: null }];
      return state;

    default:
      return state;
  }
};
 