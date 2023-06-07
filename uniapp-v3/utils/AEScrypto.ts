import CryptoJS from "crypto-js";
// 默认的 KEY 与 iv 如果没有给
const KEY = "loncom";
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypto(wordStr: any, keyStr?: any) {
  let key = keyStr ? CryptoJS.enc.Utf8.parse(wordStr + keyStr) : CryptoJS.enc.Utf8.parse(wordStr + KEY);
  let srcs = CryptoJS.enc.Utf8.parse(wordStr);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB, //mode 为ECB  不需要iv
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypto(wordStr: any, keyStr?: any) {
  let key = keyStr ? CryptoJS.enc.Utf8.parse(wordStr + keyStr) : CryptoJS.enc.Utf8.parse(wordStr + KEY);
  let base64 = CryptoJS.enc.Base64.parse(wordStr);
  let src = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
