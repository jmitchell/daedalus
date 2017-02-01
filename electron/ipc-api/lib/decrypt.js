import aesjs from 'aes-js';
import bip39 from 'bip39';
import blakejs from 'blakejs';
import validWords from './valid-words.en';
const iv = new Buffer(16); // it's iv = 0 simply

function decryptWithAES(aesKey, bytes) {
  return new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(iv)).decrypt(bytes);
}

const hexChar = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "a", "b", "c", "d", "e", "f"];

const hexToBytes = function(s){
  const arr = [];
  if(s.length & 1 == 1) {
    throw new Error("Wrong hex: " + s);
  }
  for(let i = 0; i < s.length / 2; ++i) {
    const c1 = s[2*i];
    const c2 = s[2*i + 1];
    const i1 = hexChar.indexOf(c1);
    const i2 = hexChar.indexOf(c2);

    if ( i1 == -1 || i2 == -1 )
      throw new Error("Wrong hex: " + s);

    arr[i] = (i1 << 4) + i2;
  }
  return new Uint8Array(arr);
};

const blake2b = function(data) {
  return blakejs.blake2b(data, null, 32);
};

const fromMnemonic_ = function(words) {
  return hexToBytes(bip39.mnemonicToEntropy(words, validWords));
};

export default (key, data) => decryptWithAES(blake2b(fromMnemonic_(key)), data);