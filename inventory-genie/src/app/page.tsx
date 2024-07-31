'use client'

import { Container, Typography, Box, Button, TextField, Grid, Item } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import db from "../../utils/firestore";
import { collection, addDoc, getDocs, query, onSnapshot } from "firebase/firestore";//
import { useEffect, useState } from "react";
import AddItemDialogue from "../../components/addItemDialogue";
import RemoveItemDialogue from "../../components/removeItemDialogue";
import IncrementCountDialogButton from '../../components/incrementCountDialogButton';
import DecrementCountDialogButton from "../../components/decrementCountDialogButton";


export default function Home() {

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    console.log(itemList.length)
    if (itemList.length > 0)
      return

    const getItemList = async () => {
        const collectionRef = collection(db, "items")
        const q = query(collectionRef)

        const qSnapshot = await getDocs(q)
        let documentArray:any = []
        
        qSnapshot.forEach((document: any) => {
          let obj = document.data()
          obj.id = document.id
          documentArray.push(obj)
        })
        console.log(documentArray)
        setItemList(documentArray)
    }
    getItemList()

  }, [itemList])

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
        <Box display="block" > 
            <Box display="flex" ml={5} mr={5} >
              <Typography flex={1} m={1} align="center">Item Name</Typography>
              <Typography flex={1} m={1} align="center">Count</Typography>
            </Box>
            {itemList.map(item => {
              return (
                <Box display="flex" alignItems="center" sx={{boxShadow: 2, borderRadius: "5px"}} mt={2} ml={5} mr={5} key={item.id}>
                  <Typography flex={1} m={1} align="center">{item.itemName}</Typography>
                  <Box  flex={1} m={1} display="flex" justifyContent="center" alignItems="center">
                    <DecrementCountDialogButton associatedDocId={item.id} currentCount={item.itemCount}/>
                    <Typography mr={2} ml={2}>{item.itemCount}</Typography>
                    <IncrementCountDialogButton associatedDocId={item.id} currentCount={item.itemCount}/>
                  </Box>
                  
                </Box>
              )
            })} 
        </Box>
      </Container>
    </main>
  );
}
