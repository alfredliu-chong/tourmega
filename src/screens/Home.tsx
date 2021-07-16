import React from 'react';
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_PLACES_API_KEY } from "@env"
import { updateFilterForm } from '@store/actions/ui'

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const onPressPlace = (_: any, details: GooglePlaceDetail | null) => {
    if (details) {
      const data = {
        city: '',
        country: ''
      };
      details.address_components.forEach(item => {
        if (item.types.includes('locality')) {
          data.city = item.long_name;
        }
        if (item.types.includes('country')) {
          data.country = item.long_name;
        }
      });
      
      const {country, city} = data
      dispatch(updateFilterForm('tours', {
        country,
        city
      }))

      navigation.navigate('Tours')
    }
  }

  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={onPressPlace}
        fetchDetails={true}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
      />
    </View>
  )
}

export default Home