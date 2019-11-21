export function update (state, request) {
    state.saveLoc = request.saveLoc;
    state.method = request.method;
    state.url = request.url;
    state.body = request.body;
    state.params = request.params;
    state.headers = request.headers;
    state.auth = request.auth;
}

export function clear (state) {
    state.saveLoc = '';
    state.method = '';
    state.url = '';
    state.body = '';
    state.params = [];
    state.headers = [];
    state.auth = {
        basic: {},
        bearer: {}
    };
}

export function removeParam (state, index) {
    state.params.splice(index, 1);
}

export function addParam (state, param) {
    state.params.push(param);
}

export function removeHeader (state, index) {
    state.headers.splice(index, 1);
}

export function addHeader (state, header) {
    state.headers.push(header);
}
