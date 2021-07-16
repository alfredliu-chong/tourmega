import superagent from 'superagent';
import apiCall from '@services/api';
import { LOAD_TOURS } from '@store/actions/tours';
import { DEFAULT_PAGE_SIZE } from '@constants/app';

const mockedResponse = {
  body: [{"path":"/tours/yosemite-national-park-and-giant-sequoias-trip-from-san-jose","price_in_usd":198.55,"name":"Yosemite National Park and Giant Sequoias Trip from San Jose","booking_flow_type":1,"average_rating":4.0,"duration_in_minutes":900,"number_of_reviews":4,"id":111628,"thumbnail_url":"https://d1qq4h2hdonqwg.cloudfront.net/uploads/tour_image/file/d4ec3f18-0696-4eef-bf25-f2047ea91e15/26401c0b-0e82-48a2-9bfe-9eae1b1d2bb3_thumb.jpg","city_id":3928,"city":"Yosemite National Park","favorited":false},{"path":"/tours/silicon-valley-tour-for-technology-lovers-with-tesla","price_in_usd":193.9,"name":"Silicon Valley Tour for Technology Lovers with Tesla","booking_flow_type":1,"average_rating":5.0,"duration_in_minutes":360,"number_of_reviews":1,"id":379241,"thumbnail_url":"https://d1qq4h2hdonqwg.cloudfront.net/uploads/tour_image/file/152826a2-8af0-41c0-b57b-10b0589fed01/0758cd91-2b86-49b3-b75f-255dddcf48a2_thumb.jpg","city_id":853,"city":"San Jose","favorited":false},{"path":"/tours/big-sur-monterey-california-pacific-coast-one-day-tour","price_in_usd":283.1,"name":"Big Sur Monterey California Pacific Coast One Day Tour","booking_flow_type":1,"average_rating":5.0,"duration_in_minutes":540,"number_of_reviews":2,"id":284850,"thumbnail_url":"https://d1qq4h2hdonqwg.cloudfront.net/uploads/tour_image/file/abfe9136-d3f3-4f9f-ad2e-4254d7219c8f/56cc09e0-1ac4-4d45-bd15-47eb3c132395_thumb.jpg","city_id":853,"city":"San Jose","favorited":false},{"path":"/tours/private-transfer-hotel-to-oakland-international-airport","price_in_usd":142.31,"name":"Private Transfer: Hotel to Oakland International Airport","booking_flow_type":1,"average_rating":5.0,"duration_in_minutes":60,"number_of_reviews":1,"id":109683,"thumbnail_url":"https://d1qq4h2hdonqwg.cloudfront.net/uploads/tour_image/file/a6a11fe5-aa3b-4f77-81c8-db293f928eef/e4814d47-1d9d-4a13-a469-bcc79ce76dbd_thumb.jpg","city_id":851,"city":"San Francisco","favorited":false},{"path":"/tours/computer-history-museum-general-admission-ticket","price_in_usd":16.62,"name":"Skip the Line: Computer History Museum General Admission Ticket","booking_flow_type":1,"average_rating":5.0,"duration_in_minutes":420,"number_of_reviews":1,"id":284898,"thumbnail_url":"https://d1qq4h2hdonqwg.cloudfront.net/uploads/tour_image/file/74f5031e-2f1a-4e3e-bc25-609044cc50c1/be61bb9f-1b7b-4e2f-b95a-009b2969c443_thumb.jpg","city_id":853,"city":"San Jose","favorited":false},{"path":"/tours/beginner-outdoor-rock-climbing","price_in_usd":94.05,"name":"Beginner Outdoor Rock Climbing - Bay Area","booking_flow_type":1,"average_rating":5.0,"duration_in_minutes":240,"number_of_reviews":1,"id":111645,"thumbnail_url":"https://d1qq4h2hdonqwg.cloudfront.net/uploads/tour_image/file/d6abb15e-ec04-4ad4-9478-7a446be3fe8d/838948b1-22ab-45a3-ab25-568deb21b4e7_thumb.jpg","city_id":853,"city":"San Jose","favorited":false}]
}

const mockedOptions = {
  endpoint: '',
  method: 'GET',
  query: { page: 4, size: DEFAULT_PAGE_SIZE },
  types: LOAD_TOURS,
}

const mockedGetState = jest.fn().mockReturnValue({ persist: { auth_token: 'test_token' }});
const mockedDispatch = jest.fn().mockReturnValue(null);

// Mock superagent
superagent.get = jest.fn(url => {
  return superagent;
});

superagent.query = jest.fn(url => {
  return superagent;
});

superagent.set = jest.fn(args => {
  return superagent;
});

superagent.withCredentials = jest.fn(args => {
  return superagent;
});

superagent.end = jest.fn(cb => cb(null, mockedResponse));

describe('services/api', () => {
  it('apiCall success', async () => {
    const result = await apiCall(mockedOptions)(mockedDispatch, mockedGetState);
    
    expect(result).toEqual({
      ok: true,
      allowInsert: false,
      payload: {
        data: mockedResponse.body
      }
    })

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: LOAD_TOURS.SUCCESS,
      ok: true,
      allowInsert: false,
      payload: {
        data: mockedResponse.body
      }
    })

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: LOAD_TOURS.REQUEST,
      request: superagent
    })
  });
});
