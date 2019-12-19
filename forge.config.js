module.exports = {
    packagerConfig: {
        dir: 'src-electron',
        arch: 'x64',
        platform: 'win32, darwin, linux'
    },
    makers: [
        {
            name: '@electron-forge/maker-zip'
        },
        {
            name: '@electron-forge/maker-dmg'
        }
    ]
};
