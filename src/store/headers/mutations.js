export function remove (state, index) {
    state.headers.splice(index, 1);
}

export function add (state, header) {
    state.headers.push(header);
}
