export default function log (msg = '', object) {
    console.log(msg, JSON.parse(JSON.stringify(object)));
}
