import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Paper from '@mui/material/Paper'
import MenuIcon from '@mui/icons-material/Menu'
import InputBase from '@mui/material/InputBase'
// import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const CustomizedInputBase = ({ listName, setListName }) => (
  <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  >
    <IconButton sx={{ p: '10px' }} aria-label="menu">
      <MenuIcon />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Name"
      inputProps={{ 'aria-label': 'search google maps' }}
      value={listName}
      // check if an uncontrolled form will work
      onChange={(e) => setListName(e.target.value)}
    />
  </Paper>
)

CustomizedInputBase.propTypes = {
  listName: PropTypes.string.isRequired,
  setListName: PropTypes.func.isRequired,
}

const NewCategoryListModal = ({ saveNewList }) => {
  const [open, setOpen] = useState(false)
  const [listName, setListName] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveNewList({
      name: listName,
    })
    setListName('')
  }

  return (
    <div>
      <AddIcon onClick={handleClickOpen} />
      {/*
      - should a modal be used or a dialog
      - make the dialog non-cancellable when clicked outside the modal
      */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add List
        </BootstrapDialogTitle>
        <DialogContent>
          <CustomizedInputBase listName={listName} setListName={setListName} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={(e) => handleSubmit(e)}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}

NewCategoryListModal.propTypes = {
  saveNewList: PropTypes.func.isRequired,
}

export default NewCategoryListModal
