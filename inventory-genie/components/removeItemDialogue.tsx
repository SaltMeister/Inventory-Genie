import React, {useState} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";
import DeleteIcon from '@mui/icons-material/Delete';
import db from "../utils/firestore";
import { collection, query, doc, setDoc, getDocs, where } from "firebase/firestore";


export default function RemoveItemDialogue() {

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" size="small" 
      endIcon={<DeleteIcon/>} onClick={handleClickOpen}>
        Remove Item
      </Button>

      <Dialog 
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            // Set Item Count to 0 or deuce amount
            try {
              // Update Document but 
              const collectionRef = collection(db, "items")
              const q = query(collectionRef, where("itemName", "==", formJson.itemName));
              const qSnapshot = await getDocs(q);

              qSnapshot.forEach(async(document:any) => {
                console.log(document.id, document.data())

                await setDoc(doc(db, "items", document.id), formJson, {merge: true});
              })

            } catch(e) {
              console.log(e)
            }
            handleClose();
          }
        }}
      >
        <DialogTitle>Delete Items</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please specify the item name and the amount to reduce
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            id="count"
            name="itemCount"
            label="Item Count"
            type="number"
            fullWidth
            variant="standard"/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="error">Remove</Button>
        </DialogActions>
      </Dialog>    
    </React.Fragment>
  )
}