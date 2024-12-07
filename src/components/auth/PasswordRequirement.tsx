import type { FC } from "react"
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  listItemTextClasses,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (p) => p !== "isValid",
})<{ isValid: boolean }>(({ theme, isValid }) => ({
  color: isValid ? theme.palette.success.main : theme.palette.error.light,
  padding: 0,
}))

const StyledListItemText = styled(ListItemText)({
  [`& .${listItemTextClasses.primary}`]: {
    lineHeight: 1,
    fontSize: "0.8rem",
  },
})

const StyledCheckbox = styled(Checkbox)({ paddingBlock: 3 })

const StyledListItemIcon = styled(ListItemIcon)({ minWidth: 0 })

type Props = { isValid: boolean; label: string }

export const PasswordRequirement: FC<Props> = ({ isValid, label }) => {
  return (
    <StyledListItem key={label} isValid={isValid}>
      <StyledListItemIcon>
        <StyledCheckbox disabled checked={isValid} size="small" />
      </StyledListItemIcon>
      <StyledListItemText primary={label} />
    </StyledListItem>
  )
}
