const generatePassword = (length, uppercase, lowerCase, numbers, specialChars) => {

  let characters = '';

  let result = '';

  if (length <= 5) {
    return console.log('Cant be less than 5 characters');
  }

  if (!uppercase && !lowerCase && !numbers && !specialChars) {
    return console.log('Please check at least one box');
  }

  if (uppercase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (lowerCase) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }

  if (numbers) {
    characters += '0123456789';
  }

  if (specialChars) {
    characters += "~*$%@#^&!?*'-=/,.{}()[]<>";
  }

  const charactersLength = characters.length; // if the length < 5 return alert can't be 5 or less characters
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.random() * charactersLength);
  }
  return result;
};

console.log(generatePassword(12, true, true, true, true));
