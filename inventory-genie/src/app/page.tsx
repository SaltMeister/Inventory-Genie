'use client'

import { Container, Typography, Box, Button, TextField, Grid, Item } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import db from "../../utils/firestore";
import { collection, addDoc } from "firebase/firestore";//
import { useEffect, useState } from "react";
import AddItemDialogue from "../../components/addItemDialogue";
import RemoveItemDialogue from "../../components/removeItemDialogue";
import IncrementCountDialogButton from '../../components/incrementCountDialogButton';


export default function Home() {

  const [input, setInput] = useState("")
  const AddItem = async (e: any) => {
    e.preventDefault()

    console.log(input)
    try {
      const docRef = await addDoc(collection(db, "items"), {
        name: input
      });
    } catch(e) {
      console.log(e)
    }
  }
  const itemList = [{
    name: "Pear",
    count: 5
  }, {
    name: "Sticks",
    count: 2
  }, {
    name: "Apples",
    count: 78
  }]

  return (
    <main>
      <Container fluid>
        <Box align="center" p={1} m={2}>
          <Typography variant="h4">Inventory Genie</Typography>
        </Box>

        <Box align="right" >
          <RemoveItemDialogue/>
          <AddItemDialogue/> 
       </Box>
        {/* List */}
        <Grid container spacing={0}> 
            <Grid item xs={12} display="flex" ml={5} mr={5}>
              <Typography flex={2} m={1}>Item Name</Typography>
              <Typography flex={1} m={1}>Count</Typography>
            </Grid>
            {itemList.map(x => {
              return (
                <Grid item xs={12} display="flex" sx={{boxShadow: 2, borderRadius: "5px"}} mt={2} ml={5} mr={5}>
                  <Typography flex={2} m={1}>{x.name}</Typography>
                  <Box  flex={1} m={1} display="flex">
                    <Typography>{x.count}</Typography>
                    <IncrementCountDialogButton/>
                  </Box>
                  
                </Grid>
              )
            })} 
        </Grid>
      </Container>
    </main>
  );
}
