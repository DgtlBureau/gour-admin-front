export function validateEmail(text: string) {
  return !!text
    .toLowerCase()
    .match(
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function validatePassword(text: string) {
  return text.length >= 5;
}
