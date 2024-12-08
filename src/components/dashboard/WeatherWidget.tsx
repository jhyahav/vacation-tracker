import { Box, Skeleton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import type { FC } from "react"

type Props = {
  conditions: string | undefined
  description: string | undefined
  icon: string | undefined
  isLoading: boolean
  temp: number | undefined
}

const WidgetContainer = styled(Box)({
  textAlign: "center",
})

const WeatherIcon = styled("img")({
  width: 100,
  height: 100,
  margin: "auto",
})

export const WeatherWidget: FC<Props> = ({
  conditions,
  description,
  icon,
  isLoading,
  temp,
}) => {
  return (
    <WidgetContainer>
      {isLoading ? (
        <Skeleton animation="wave" variant="rectangular" width="100%" />
      ) : (
        <>
          <WeatherIcon
            alt={description}
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          />
          {temp ? (
            <Typography variant="h6">{`${Math.round(temp)}°`}</Typography>
          ) : null}
          <Typography style={{ textTransform: "capitalize" }} variant="body2">
            {conditions}
          </Typography>
        </>
      )}
    </WidgetContainer>
  )
}
