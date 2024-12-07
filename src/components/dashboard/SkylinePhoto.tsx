import type { FC } from "react"
import { Card, CardMedia, Skeleton } from "@mui/material"

import { useUnsplashPhoto } from "../../hooks/queries/useUnsplashPhoto"

type Props = { cityName: string }

export const SkylinePhoto: FC<Props> = ({ cityName }) => {
  const query = `${cityName} skyline`

  const { data: photo, isLoading } = useUnsplashPhoto(query)

  return (
    <Card sx={{ width: 345, margin: "16px" }}>
      {isLoading ? (
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
      )}
    </Card>
  )
}
