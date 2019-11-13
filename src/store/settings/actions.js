export function update (context, payload) {
    return new Promise((resolve) => {
        context.commit('update', payload);
        resolve(payload);
    });
}
