import React, {useState} from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";
import db from "../utils/firestore";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export default function DecrementCountDialogButton({associatedDocId, currentCount} : {associatedDocId:string, currentCount:number}) {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="hidden" size="small" onClick={handleClickOpen}
       style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} disableElevation>
          <RemoveIcon fontSize="small"/>          

      </Button>
      <Dialog
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: async(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()

          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());

          // Increase amount for DOC ID
          try {
            await updateDoc(doc(db, "items", associatedDocId), 
            {"itemCount": Number(currentCount) - Number(formJson.countToRemove) })

            setOpen(false)
          } catch (e) {
            console.log(e)
          }
        }
      }}
      >
        <DialogTitle>Reduce Inventory</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter the amount that you will be reducing for this item.
          </DialogContentText>

          <TextField           
            autoFocus
            required
            margin="dense"
            id="count"
            name="countToRemove"
            label="Amount To Remove"
            type="number"
            fullWidth
            variant="standard">
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Remove</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}