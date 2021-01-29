import axios from "axios";
import * as queryString from "query-string"

const HUB_API_ENDPOINT = process.env.REACT_APP_HUB_API!

export const getHubImages = async () => {
  const response = await axios.get(
    HUB_API_ENDPOINT + '/images',
    {
      params: {
        kind: ['encoder', 'crafter'],
        type: undefined
      },
      paramsSerializer: (params) => queryParamsSerializer(params)
    }
  )

  return response.data
}

export const queryParamsSerializer = (params: Record<string, any>) => queryString.stringify(params, {arrayFormat: 'comma', skipNull: true})