var codemirror = {
    tabSize: 2,
    mode: 'application/json',
    lineNumbers: true,
    smartIndent: true,
    lineWrapping: true,
    lineWiseCopyCut: false,
    scrollbarStyle: 'null',
    showCursorWhenSelecting: true,
    autoCloseBrackets: true,
    matchBrackets: true
};

var url = {
    protocols: ['http', 'https', 'ftp'],
    require_tld: false,
    require_protocol: false,
    require_host: false,
    require_valid_protocol: true,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false
};

export {
    codemirror,
    url
};

export default {
    codemirror: codemirror,
    url: url
};
