export const rootReducer = (state={}, action) => {
    switch (action.type) {
        case "DISPATCH_POST_ID":
            return {
                ...state,
                postToBeRenderedId: action.value,
                isPostDownloaded: false,
            };

        case "DISPATCH_NEW_POST":
            return {
                ...state,
                newPostState: {
                    id: action.id,
                    title: action.title,
                    body: action.body,
                    comments: [],
                }
            }

        default:
            return state;
    }
};