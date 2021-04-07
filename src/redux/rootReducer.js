export const rootReducer = (state={}, action) => {
    switch (action.type) {
        case "DISPATCH_POST_ID":
            return {
                ...state,
                postToBeRenderedId: action.value,
                isPostDownloaded: false,
            };

        default:
            return state;
    }
};