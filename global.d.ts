declare module "*.png"

declare namespace tourmega {
  type AsyncAction = {
    REQUEST: string
    SUCCESS: string
    FAILURE: string
  }

  type HandlerOption = {
    singular: boolean
    mapToKey: string
    payloadDataField: string
  }

  type Tour = {
    id: number
    average_rating: number
    booking_flow_type: number
    city: string
    city_id: number
    duration_in_minutes: number
    favorited: false
    name: string
    number_of_reviews: number
    path: string
    price_in_usd: number
    thumbnail_url: string
  }
}