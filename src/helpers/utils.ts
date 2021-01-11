export const copyToClipboard = (str: string) => {
  const temp = document.createElement("textarea");
  temp.value = str;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  return;
};
