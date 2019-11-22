import CryptoJS from './crypto-js/crypto-js'
// 默认的 KEY 如果没有给
const KEY = "Airubby";//""中与后台一样  密码
const keySize=128;
const fillKey = (key) => { 
    const filledKey = Buffer.alloc(keySize / 8); 
    const keys = Buffer.from(key); 
    if (keys.length < filledKey.length) { 
        filledKey.map((b, i) => filledKey[i] = keys[i]); 
    }
    return filledKey; 
}
/**
 * AES加密 ：字符串 key iv  返回base64
 */
function Encrypt(word, keyStr) {
    let key = keyStr ? CryptoJS.enc.Utf8.parse(fillKey(keyStr)):CryptoJS.enc.Utf8.parse(fillKey(KEY));
    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,  //mode 为ECB  不需要iv
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
function Decrypt(word, keyStr, ivStr) {
    let key = keyStr ? CryptoJS.enc.Utf8.parse(fillKey(keyStr)):CryptoJS.enc.Utf8.parse(fillKey(KEY));
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
    var decrypt = CryptoJS.AES.decrypt(src, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
export default{
	Encrypt,
    Decrypt,
}
