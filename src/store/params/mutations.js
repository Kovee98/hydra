export function remove (state, index) {
    state.params.splice(index, 1);
}

export function add (state, param) {
    state.params.push(param);
}

export function update (state, param) {
    state.params[param.index] = param.arg;
}
