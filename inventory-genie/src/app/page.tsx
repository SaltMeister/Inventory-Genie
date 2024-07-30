'use client'

import { Container, Typography, Box, Button, TextField } from "@mui/material";
import db from "../../utils/firestore";
import { collection, addDoc } from "firebase/firestore";//
import { useEffect, useState } from "react";


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

  return (
    <main>
      <Container flex>
        <Typography variant="h3">Inventory Genie</Typography>
        <form onSubmit={AddItem}>
          <TextField variant="outlined"
          value={input}
          onInput={ (e: any) => setInput(e.target.value)}/>
          
          <Button type="submit">Test Create</Button>          
        </form>
        <Box sx={{width: 300}}>

        </Box>
      </Container>
    </main>
  );
}
