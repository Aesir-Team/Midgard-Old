import axios from "axios";
import * as FileSystem from "expo-file-system";
import KakuseiAPI from "./KakuseiAPI";

class MangaFileManager {
  async getAllDownloadedMangas(): Promise<string[]> {
    try {
      const baseDirectoryUri = `${FileSystem.documentDirectory}media/`;
      const items = await FileSystem.readDirectoryAsync(baseDirectoryUri);
      const dirList = items.filter(
        (item) => item !== ".DS_Store" && !item.startsWith(".")
      );
      return dirList;
    } catch (error) {
      console.error("Erro ao listar os mangás baixados:", error);
      return [];
    }
  }

  async getDownloadedImages(
    mangaName: string,
    chapterName: string
  ): Promise<string[]> {
    const baseDirectoryUri = `${FileSystem.documentDirectory}media/${mangaName}/${chapterName}`;
    try {
      const items = await FileSystem.readDirectoryAsync(baseDirectoryUri);
      const sortedImages = items
        .filter((item) => item !== ".DS_Store")
        .sort(
          (a, b) =>
            parseInt(a.match(/\d+/)?.[0] || "0") -
            parseInt(b.match(/\d+/)?.[0] || "0")
        );
      return sortedImages.map(
        (imageName) => `${baseDirectoryUri}/${imageName}`
      );
    } catch (error) {
      console.error(
        `Erro ao listar imagens do capítulo ${chapterName}:`,
        error
      );
      return [];
    }
  }

  async getDownloadedChapters(mangaName: string): Promise<string[]> {
    const baseDirectoryUri = `${FileSystem.documentDirectory}media/${mangaName}/`;

    try {
      const dirInfo = await FileSystem.getInfoAsync(baseDirectoryUri);
      if (!dirInfo.exists || !dirInfo.isDirectory) {
        return [];
      }

      const items = await FileSystem.readDirectoryAsync(baseDirectoryUri);
      const dirList = items.filter((item) => item !== ".DS_Store");

      const sortedChapters = dirList
        .map((chapter) => ({
          title: chapter,
          number: this.extractChapterNumber(chapter),
        }))
        .filter(({ number }) => number !== null)
        .sort((a, b) => {
          const [aMain, aSub] = (a.number ?? "").split(".").map(Number);
          const [bMain, bSub] = (b.number ?? "").split(".").map(Number);
          if (aMain !== bMain) {
            return aMain - bMain;
          }
          return (aSub || 0) - (bSub || 0);
        });

      return sortedChapters.map(({ title }) => title).reverse();
    } catch (error) {
      console.error(`Erro ao listar capítulos do mangá ${mangaName}:`, error);
      return [];
    }
  }

  extractChapterNumber(chapter: string): string | null {
    const match = chapter.match(/(\d+(\.\d+)?)/);
    return match ? match[0] : null;
  }

  async downloadManga(mangaName: string, chapters: string[]): Promise<void> {
    const baseDirectoryUri = `${FileSystem.documentDirectory}media/${mangaName}/`;

    try {
      for (const chapterName of chapters) {
        // Obter URLs das imagens de cada capítulo
        const imageUrls = await KakuseiAPI.getImageUrls(
          mangaName,
          parseInt(chapterName)
        );
        if (imageUrls.length === 0) {
          console.warn(`Nenhuma imagem encontrada para ${chapterName}`);
          continue;
        }

        const chapterDirectoryUri = `${baseDirectoryUri}${chapterName}/`;
        await FileSystem.makeDirectoryAsync(chapterDirectoryUri, {
          intermediates: true,
        });

        for (const [index, imageUrl] of imageUrls.entries()) {
          const imagePath = `${chapterDirectoryUri}${index + 1}.jpg`;
          const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });

          // Converte os dados binários para base64
          const base64String = Buffer.from(response.data, "binary").toString(
            "base64"
          );

          // Escreve a imagem no sistema de arquivos
          await FileSystem.writeAsStringAsync(imagePath, base64String, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
      }
      console.log(`Download completo para ${mangaName}`);
    } catch (error) {
      console.error(`Erro ao fazer download do mangá ${mangaName}:`, error);
    }
  }
}

export default MangaFileManager;
