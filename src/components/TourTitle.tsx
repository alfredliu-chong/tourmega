import { getFilter } from '@store/selectors/ui'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

const TourTitle = () => {
  const filter = useSelector(getFilter('tours'))
  return (
    <Text style={styles.title}>{filter.city}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600"
  }
})

export default TourTitle