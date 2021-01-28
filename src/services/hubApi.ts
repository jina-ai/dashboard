import axios from "axios";

const HUB_API_ENDPOINT = process.env.REACT_APP_HUB_API!

export const getHubImages = async () => {
  const response = await axios.get(
    HUB_API_ENDPOINT + '/images',
    {
      url: '/images',
    }
  )

  return response.data
}