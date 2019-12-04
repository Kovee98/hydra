/*
    General utility methods
*/

import { Notify } from 'quasar';

var notify = ({ msg, isOk = true }) => {
    Notify.create({
        message: msg,
        color: isOk ? 'default' : 'red',
        icon: isOk ? 'info_outline' : 'report_problem',
        position: 'bottom-left',
        actions: [
            {
                label: 'Dismiss',
                color: 'white',
                handler: () => {}
            }
        ]
    });
};

var isValidUrl = (url) => {
    let pattern = new RegExp('^http://\\w+(.\\w+)(:[0-9]+)?/?(/[.\\w])*$');
    return pattern.test(url);
};

/*
    returns:
        - 0 if equal
        - negative integer if v1 < v2
        - positive integer if v1 > v2
        - NaN if either version string is in the wrong format
*/
var compareVersions = (v1, v2, opts) => {
    let lexicographical = opts && opts.lexicographical,
        zeroExtend = opts && opts.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');
    var isValidPart = (x) => (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push('0');
        while (v2parts.length < v1parts.length) v2parts.push('0');
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
            return 1;
        }

        if (v1parts[i] === v2parts[i]) {
            continue;
        } else if (v1parts[i] > v2parts[i]) {
            return 1;
        } else {
            return -1;
        }
    }

    if (v1parts.length !== v2parts.length) {
        return -1;
    }

    return 0;
};

export {
    compareVersions,
    isValidUrl,
    notify
};

export default {
    compareVersions: compareVersions,
    isValidUrl: isValidUrl,
    notify: notify
};
