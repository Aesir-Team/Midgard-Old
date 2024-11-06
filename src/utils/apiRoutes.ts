const defaultUrl = "http://192.168.2.57:3000/api/kakusei";

export const routes = {
  homePage: () => `${defaultUrl}`,
  searchPage: () => `${defaultUrl}/search`,
  mangaPage: () => `${defaultUrl}/manga`,
  chapterPage: () => `${defaultUrl}/chapter`,
  imagePage: () => `${defaultUrl}/images`,
};
