import { useQuery } from "@tanstack/react-query"
import { createApi } from "unsplash-js"

const api = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
})

const fetchPhotos = async (query: string) => {
  const response = await api.search.getPhotos({
    query,
    perPage: 1, // only get the top result
  })

  if (response.errors) {
    throw new Error(response.errors.join(", "))
  }

  return response.response.results[0]
}

export const useUnsplashPhoto = (query: string) => {
  return useQuery({
    queryKey: ["photos", query],
    queryFn: () => fetchPhotos(query),
    staleTime: Infinity, // city photos are unlikely to change during a session
  })
}
