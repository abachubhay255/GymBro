import {Divider, Layout} from '@ui-kitten/components';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type Props = {
  photos: any[];
};

export default function GalleryView({photos}: Props) {
  const renderItem = (info: ListRenderItemInfo<any>) => {
    return (
      <Image style={styles.image} source={{uri: info.item.node.image.uri}} />
    );
  };
  return (
    <Layout style={styles.gallery}>
      <FlatList data={photos} renderItem={renderItem} numColumns={3} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  gallery: {
    height: '50%',
  },
  image: {
    width: 125,
    height: 125,
    margin: 3,
    borderRadius: 5
  },
});
