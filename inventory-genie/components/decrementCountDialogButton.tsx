import RemoveIcon from '@mui/icons-material/Remove';
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";
import db from "../utils/firestore";

export default function DecrementCountDialogButton({associatedDocId, currentCount, updateInventory} : {associatedDocId:string, currentCount:number, updateInventory:Function}) {
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
       sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} disableElevation>
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
            updateInventory();
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