import CryptoJS from "crypto-js";


const SECRET_KEY =
  process.env.ENCRYPTION_SECRET_KEY || "UIB_Jayalah_Selamanya_*&#";


export function encrypt(data: string | number): string {
  const encrypted = CryptoJS.AES.encrypt(
    data.toString(),
    SECRET_KEY
  ).toString();
  return encrypted.replace(/\
}


export function decrypt(encryptedData: string): string {
  const base64Data = encryptedData.replace(/_/g, "/").replace(/-/g, "+");
  const decrypted = CryptoJS.AES.decrypt(base64Data, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
}