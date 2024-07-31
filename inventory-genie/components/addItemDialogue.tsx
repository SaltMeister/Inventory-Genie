import React, {useState} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";
import AddIcon from '@mui/icons-material/Add';
import db from "../utils/firestore";
import { collection, addDoc, query, doc, setDoc, getDocs, where } from "firebase/firestore";


export default function AddItemDialogue() {

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
      endIcon={<AddIcon/>} onClick={handleClickOpen}>
        Add New Item
      </Button>

      <Dialog 
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            
            console.log(formJson)
            try {
              const q = query(collection(db,"items"), where("itemName", "==", formJson.itemName))
              const qSnapshot = await getDocs(q)

              if(!qSnapshot.empty) {
                console.log("Item alreadyt exists in inventory")
                return
              }
              
              await addDoc(collection(db, "items"), formJson);
            } catch(e) {
              console.log(e)
            }
            handleClose();
          }
        }}
      >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please specify the item name and the amount to add
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
          <Button type="submit" color="success">Add</Button>
        </DialogActions>
      </Dialog>    
    </React.Fragment>
  )
}