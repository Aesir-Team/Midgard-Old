interface KakuseiSearchManga {
  title: string;
  imageUrl: string;
  link: string;
  authors: string[];
  artists: string[];
  genres: string[];
  status: string;
  releaseYear: string;
  latestChapter: string;
  lastUpdated: string;
  rating: string;
}

interface KakuseiHomeMangaItem {
  title: string;
  url: string;
  imgSrc: string;
  rating: string;
  chapters: {
    title: string;
    link: string;
  }[];
}

interface KakuseiHomeManga {
  mangaList: KakuseiHomeMangaItem[];
}

interface KakuseiChapterManga {
  title: string;
  link: string;
  releaseDate: string;
}
