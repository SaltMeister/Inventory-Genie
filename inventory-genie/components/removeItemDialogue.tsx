import React, {useState} from "react";
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";
import DeleteIcon from '@mui/icons-material/Delete';
import db from "../utils/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";


export default function RemoveItemDialogue({associatedDocId, updateInventory} : {associatedDocId:string, updateInventory: Function}) {

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const deleteDocument = async() => {
            
      try {
        // Update Document but 
        const docRef = doc(db, "items", associatedDocId)
        await deleteDoc(docRef)

      } catch(e) {
        console.log(e)
      }

      handleClose();
      updateInventory();
  }

  return (
    <React.Fragment>
      <IconButton aria-label="delete"onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog 
        open={open}
      >
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="error" onClick={deleteDocument}>Delete</Button>
        </DialogActions>
      </Dialog>    
    </React.Fragment>
  )
}