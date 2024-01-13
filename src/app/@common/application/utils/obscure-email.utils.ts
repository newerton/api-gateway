export const obscureEmail = (email: string, quant = 2): string => {
  const [username, domain] = email.split('@');
  const result: string[] = [];
  for (let i = 0; i < username.length; i += quant) {
    result.push(username.substring(i, i + quant));
  }

  const obscuredArr: string[] = result.map((word, index) => {
    if (index % 2 !== 0) {
      return '*'.repeat(word.length);
    } else {
      return word;
    }
  });

  const obscuredUsername = obscuredArr.join('');
  const obscuredEmail = `${obscuredUsername}@${domain}`;
  return obscuredEmail;
};
