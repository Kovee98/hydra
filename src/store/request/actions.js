export function update (context, payload) {
    context.commit('update', payload);
}

export function updateParam (context, payload) {
    context.commit('updateParam', payload);
}

export function removeParam (context, payload) {
    context.commit('removeParam', payload);
}

export function addParam (context, payload) {
    context.commit('addParam', payload);
}

export function removeHeader (context, payload) {
    context.commit('removeHeader', payload);
}

export function addHeader (context, payload) {
    context.commit('addHeader', payload);
}

export function updateHeader (context, payload) {
    context.commit('updateHeader', payload);
}
