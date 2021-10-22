import { spotify } from "./config";

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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export const isValidSpotifyTrackUrl = (spotifyTrackUrl: string) => {
  const url = spotifyTrackUrl && isValidHttpUrl(spotifyTrackUrl) ? new URL(spotifyTrackUrl) : null;
  return url && url.hostname == spotify.hostname && url.pathname.includes("/track/");
};
