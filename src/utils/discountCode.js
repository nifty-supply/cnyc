import JSEncrypt from "jsencrypt";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCx3S/nFd1+KaunH/bT08hKBJGG
b10//5fbkuaM6yDD5nYuzZ4s0zhCT/9xLfnWSFJPd9NXD0FEUcoy+nx9XxKrivr6
cQuIxefki7ePuhlWyGCuFKpGzgVhogHR3047oPKUlcmS7OP8XSu+C104aVYIUZeN
RjWo6UdT9haqd99ZkQIDAQAB
-----END PUBLIC KEY-----`;

const encrypt = new JSEncrypt();
encrypt.setPublicKey(PUBLIC_KEY);

export function generateDiscountCode(account, eventName) {
  return `${encrypt
    .encrypt(JSON.stringify({ account, eventName }))
    .slice(0, 10)}`;
}
