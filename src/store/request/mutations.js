export function update (state, { body, params, headers }) {
    state.body = body;
    state.params = params;
    state.headers = headers;
}

export function updateParam (state, param) {
    state.params[param.index] = param.arg;
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

export function updateHeader (state, header) {
    state.headers[header.index] = header.arg;
}
