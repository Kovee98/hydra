export function update (context, payload) {
    context.commit('update', payload);
}

export function updateMostRecent (context, payload) {
    context.commit('updateMostRecent', payload);
}

export function updateNotifications (context, payload) {
    context.commit('updateNotifications', payload);
}
