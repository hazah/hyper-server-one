export default function userDBName(email: string): string {
  const usernameHex = Array.from(btoa(email))
    .map((c) => c.charCodeAt(0).toString(16))
    .join("");
  return `userdb-${usernameHex}`;
}
