function getaccesstoken(tokens) {
    return {
        type: "GET_TOKEN",
        payload: {token: tokens.access, refresh_token: tokens.refresh}
    }
}

export { getaccesstoken }