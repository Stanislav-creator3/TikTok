export const request = async ({method = "GET", path, body }) => {
  const url = `https://tiktok-video-no-watermark2.p.rapidapi.com/${path}`;
  const options = {
    method,
    headers: {
      "x-rapidapi-key": "0ac6f2016bmshcb36d31fea32166p173c4fjsn15213e62516e",
      "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",

    },
  };

  if (body) options.body = body;

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const formatNum = (num) => {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });

  return formatter.format(num);
};

export const replaceWithBr = (str = "") => str.replace(/\n/g, "<br />");
