import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";
import db from "../utils/firestore";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export default function IncrementCountDialogButton({associatedDocId, currentCount, updateInventory} : {associatedDocId:string, currentCount:number, updateInventory:Function}) {
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
          <AddIcon fontSize="small"/>          

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
            {"itemCount": Number(formJson.countToAdd) + Number(currentCount)})

            setOpen(false);
            updateInventory();
          } catch (e) {
            console.log(e)
          }
        }
      }}
      >
        <DialogTitle>Increase Inventory</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter the amount that you will be increasing for this item.
          </DialogContentText>

          <TextField           
            autoFocus
            required
            margin="dense"
            id="count"
            name="countToAdd"
            label="Amount To Add"
            type="number"
            fullWidth
            variant="standard">
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}