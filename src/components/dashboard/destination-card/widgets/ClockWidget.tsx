import type { FC } from "react"
import { useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Clock from "react-clock"
import "react-clock/dist/Clock.css"

const ClockContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
  justifyContent: "center",
  alignItems: "center",
  gap: 24,

  " .react-clock__face": {
    backgroundColor: "white",
  },
  " .react-clock__mark__number": {
    color: "black",
    fontSize: "0.8rem",
  },
})

type Props = {
  getTime: () => Date
}

export const ClockWidget: FC<Props> = ({ getTime }) => {
  const [time, setTime] = useState(getTime())

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [getTime])

  return (
    <ClockContainer>
      <Clock renderNumbers size={110} value={time} />
      <Typography variant="body1">{time.toLocaleTimeString()}</Typography>
    </ClockContainer>
  )
}
