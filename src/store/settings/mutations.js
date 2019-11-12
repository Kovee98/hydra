export function update (state, settings) {
    // console.log('colors:', colors);
    // console.log('history:', history);
    // console.log('notifications:', notifications);
    state.colors = settings.colors;
    state.history = settings.history;
    state.notifications = settings.notifications;
}
