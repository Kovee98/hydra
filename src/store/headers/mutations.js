export function remove (state, index) {
    state.headers.splice(index, 1);
}

export function add (state, header) {
    state.headers.push(header);
}

export function update (state, header) {
    state.headers[header.index] = header.arg;
}
