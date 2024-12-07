import type { FC } from "react"
import { useEffect, useState } from "react"

import Clock from "react-clock"
import "react-clock/dist/Clock.css"

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
  }, [])

  return (
    <div>
      <Clock renderNumbers size={200} value={time} />
      <p>Current time: {time.toLocaleTimeString()}</p>
    </div>
  )
}
