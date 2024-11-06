import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../../theme";
import { Header } from "../../../components/Header";

const mangas = [
  { id: 1, title: 'Manga 1', tags: ['Ação', 'Aventura'] },
  { id: 2, title: 'Manga 2', tags: ['Comédia', 'Mistério'] },
  { id: 3, title: 'Manga 3', tags: ['Drama', 'Fantasia'] },
  { id: 4, title: 'Manga 4', tags: ['Ação', 'Comédia'] },
  { id: 5, title: 'Manga 5', tags: ['Aventura', 'Drama'] },
  { id: 6, title: 'Manga 6', tags: ['Fantasia', 'Comédia'] },
  { id: 7, title: 'Manga 7', tags: ['Ação', 'Drama'] },
  { id: 8, title: 'Manga 8', tags: ['Aventura', 'Fantasia'] },
  { id: 9, title: 'Manga 9', tags: ['Comédia', 'Drama'] },
  { id: 10, title: 'Manga 10', tags: ['Ação', 'Fantasia'] },
  { id: 11, title: 'Manga 11', tags: ['Romance', 'Ação'] },
  { id: 12, title: 'Manga 12', tags: ['Sci-Fi', 'Aventura'] },
  { id: 13, title: 'Manga 13', tags: ['Romance', 'Comédia'] },
  { id: 14, title: 'Manga 14', tags: ['Drama', 'Sci-Fi'] },
  { id: 15, title: 'Manga 15', tags: ['Fantasia', 'Romance'] },
  { id: 16, title: 'Manga 16', tags: ['Ação', 'Sci-Fi'] },
  { id: 17, title: 'Manga 17', tags: ['Aventura', 'Romance'] },
  { id: 18, title: 'Manga 18', tags: ['Comédia', 'Sci-Fi'] },
  { id: 19, title: 'Manga 19', tags: ['Drama', 'Romance'] },
  { id: 20, title: 'Manga 20', tags: ['Fantasia', 'Sci-Fi'] },
  { id: 21, title: 'Manga 21', tags: ['Mistério', 'Terror'] },
  { id: 22, title: 'Manga 22', tags: ['Histórico', 'Esporte'] },
  { id: 23, title: 'Manga 23', tags: ['Musical', 'Romance'] },
  { id: 24, title: 'Manga 24', tags: ['Ação', 'Mistério'] },
  { id: 25, title: 'Manga 25', tags: ['Aventura', 'Terror'] },
  { id: 26, title: 'Manga 26', tags: ['Comédia', 'Histórico'] },
  { id: 27, title: 'Manga 27', tags: ['Drama', 'Esporte'] },
  { id: 28, title: 'Manga 28', tags: ['Fantasia', 'Musical'] },
  { id: 29, title: 'Manga 29', tags: ['Romance', 'Mistério'] },
  { id: 30, title: 'Manga 30', tags: ['Sci-Fi', 'Terror'] },
  { id: 31, title: 'Manga 31', tags: ['Ação', 'Romance'] },
  { id: 32, title: 'Manga 32', tags: ['Aventura', 'Comédia'] },
  { id: 33, title: 'Manga 33', tags: ['Drama', 'Fantasia'] },
  { id: 34, title: 'Manga 34', tags: ['Comédia', 'Terror'] },
  { id: 35, title: 'Manga 35', tags: ['Histórico', 'Romance'] },
  { id: 36, title: 'Manga 36', tags: ['Fantasia', 'Aventura'] },
  { id: 37, title: 'Manga 37', tags: ['Sci-Fi', 'Comédia'] },
];

const tags = [
  'Ação', 'Aventura', 'Comédia', 'Drama',
  'Fantasia', 'Romance', 'Mistério', 'Terror',
  'Histórico', 'Esporte', 'Musical', 'Sci-Fi'
];

export default function Home() {
  const renderMangaItem = ({ item }: { item: typeof mangas[0] }) => (
    <View style={styles.mangaItem}>
      <Text style={styles.mangaTitle}>{item.title}</Text>
    </View>
  );

  const renderTagItem = ({ item }: { item: string }) => {
    const filteredMangas = mangas.filter(manga => manga.tags.includes(item));

    return (
      <View style={styles.tagContainer}>
        <Text style={styles.tagTitle}>{item}</Text>
        <FlatList
          data={filteredMangas}
          keyExtractor={manga => manga.id.toString()}
          renderItem={renderMangaItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={tags}
        keyExtractor={(item) => item}
        renderItem={renderTagItem}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tagContainer: {
    marginBottom: 10,
  },
  tagTitle: {
    fontFamily: theme.font_family.bold,
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 10,
  },
  horizontalList: {
    paddingVertical: 5,
  },
  mangaItem: {
    backgroundColor: theme.colors.purpleLight,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 100,
    height: 140,
    alignItems: 'center',
  },
  mangaTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
