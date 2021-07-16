import React from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoading, getTours } from '@store/selectors/tours'
import { getCurrentPage, getCurrentPageSize } from '@store/selectors/ui'
import { changePage } from '@store/actions/ui'
import TourItem from '@components/TourItem'

const Tours = () => {
  const dispatch = useDispatch()
  const tours: [tourmega.Tour] = useSelector(getTours)
  const currentPage = useSelector(getCurrentPage('tours'))
  const currentPageSize = useSelector(getCurrentPageSize('tours'))

  const isLoading = useSelector(getIsLoading)
  const isMore = tours.length === currentPageSize * currentPage

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator
            color="black"
            style={{margin: 15}} />
        ) : null}
      </View>
    )
  }

  const loadMore = () => {
    isMore && dispatch(changePage('tours', currentPage + 1))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={tours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (<TourItem item={item}/>)}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Tours