import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "../node_modules/@mui/material/index";


export default function IncrementCountDialogButton({associatedDocId} : {associatedDocId:string}) {
  return (
    <React.Fragment>
      <Button variant="outlined" size="small"
       style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} disableElevation>
        <AddIcon/>
      </Button>
    </React.Fragment>
  )
}