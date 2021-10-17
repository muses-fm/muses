export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  const words = name.split(" ");

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: words.length > 1 ? `${words[0][0]}${words[1][0]}` : `${words[0].substring(0, 2)}`,
  };
};
