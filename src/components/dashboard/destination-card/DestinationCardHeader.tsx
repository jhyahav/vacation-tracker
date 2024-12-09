import type { FC } from "react"

import {
  CardHeader,
  cardHeaderClasses,
  IconButton,
  Skeleton,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"

const StyledCardHeader = styled(CardHeader)({
  [` .${cardHeaderClasses.content}`]: {
    marginLeft: 40,
  },
})

type Props = {
  countryName: string | undefined
  name: string | undefined
  handleDelete: () => void
}

export const DestinationCardHeader: FC<Props> = ({
  countryName,
  name,
  handleDelete,
}) => {
  return (
    <StyledCardHeader
      action={
        <IconButton aria-label="delete" onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
      }
      subheader={countryName ?? <HeaderSkeleton />}
      title={name ?? <HeaderSkeleton />}
    />
  )
}

const HeaderSkeleton: FC = () => (
  <Skeleton animation="wave" data-testid="card-header-skeleton" />
)
