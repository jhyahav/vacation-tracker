import type { FC } from "react"
import { toast } from "react-toastify"

import { CardMedia, Skeleton } from "@mui/material"

import { useUnsplashPhoto } from "../../hooks/queries/useUnsplashPhoto"

type Props = { cityName: string | undefined }

export const SkylinePhoto: FC<Props> = ({ cityName }) => {
  const query = `${cityName} skyline`

  const { data: photo, isLoading, isError, error } = useUnsplashPhoto(query)

  if (isError) {
    toast.error(`Error fetching photo: ${error?.message}`)
  }

  return isLoading || !cityName ? (
    <Skeleton
      animation="wave"
      height={194}
      variant="rectangular"
      width="100%"
    />
  ) : (
    <CardMedia
      alt={`Photo by ${photo?.user.name}`}
      component="img"
      height="194"
      image={photo?.urls.regular}
    />
  )
}
