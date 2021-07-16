import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { Rating } from 'react-native-ratings'

const TourItem: React.FC<{
  item: tourmega.Tour
}> = ({ item }) => {
  const onPress = () => {

  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: item.thumbnail_url }} style={styles.thumbnail}/>
        <View style={styles.content}>
          <Text>{item.name}</Text>
          <View style={styles.content_bottom}>
            <Text style={{ flex: 1 }}>${item.price_in_usd}</Text>
            <Rating
              ratingCount={5}
              startingValue={item.average_rating}
              imageSize={20}
              readonly
              tintColor='#f2f2f2'
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 10
  },
  content: {
    marginLeft: 15,
    marginVertical: 25,
    flex: 1,
    justifyContent: 'space-between'
  },
  content_bottom: {
    flex: 1, 
    alignItems: 'flex-end', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
})

export default TourItem