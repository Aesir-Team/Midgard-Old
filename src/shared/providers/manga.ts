export enum MangaProvider {
  LER_MANGA = "LER_MANGA",
}

const MangaProviderURL: Record<MangaProvider, string> = {
  [MangaProvider.LER_MANGA]: "https://lermanga.one",
};

export default function GetMangaProvider(provider: MangaProvider) {
  return MangaProviderURL[provider];
}
