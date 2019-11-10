export function update (state, settings) {
    state.settings = settings;
}

export function updateMostRecent (state, mostRecent) {
    state.settings.history.mostRecent = mostRecent;
}

export function updateNotifications (state, notifications) {
    state.settings.notifications = notifications;
}
