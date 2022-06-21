//eslint-disable-next-line
const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function (email) {
    return (email == "") ? "" : (reg.test(email)) ? 'valid' : 'invalid';
}