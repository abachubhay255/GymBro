import {Layout} from '@ui-kitten/components';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

type Props = {
  photos: any[];
};

export default function GalleryView({photos}: Props) {
  return (
    <View>
      <ScrollView>
        <Layout style={styles.container}>
          {photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: '33%',
                  height: 100,
                }}
                source={{uri: p.node.image.uri}}
              />
            );
          })}
        </Layout>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
