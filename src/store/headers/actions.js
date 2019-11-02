export function remove (context, payload) {
    context.commit('remove', payload);
}

export function add (context, payload) {
    context.commit('add', payload);
}

export function update (context, payload) {
    context.commit('update', payload);
}
