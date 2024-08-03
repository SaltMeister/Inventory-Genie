'use client'

import { Container, Typography, Box } from "@mui/material";
import db from "../../utils/firestore";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddItemDialogue from "../../components/addItemDialogue";
import RemoveItemDialogue from "../../components/removeItemDialogue";
import IncrementCountDialogButton from '../../components/incrementCountDialogButton';
import DecrementCountDialogButton from "../../components/decrementCountDialogButton";
import { Stack } from "../../node_modules/@mui/material/index";
import SearchBar from "../../components/searchBar";


export default function Home() {

  const [itemList, setItemList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([])

  const [filterString, setFilterString] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);


  useEffect(() => {
    console.log(itemList.length)
    if (itemList.length > 0 )
      return

    const getItemList = async () => {
        const collectionRef = collection(db, "items")
        const q = query(collectionRef)

        const qSnapshots = await getDocs(q)
        let documentArray:any = []
        
        qSnapshots.forEach((document: any) => {
          let obj = document.data()
          obj.id = document.id
          documentArray.push(obj)
        })

        setItemList(documentArray)  
      }
    getItemList()


  }, [itemList])

  useEffect(() => {
      //Filter if active
      if(isFilterActive) {
        const fList = itemList.filter(item => item.itemName.includes(filterString))   
        
        setFilteredItems(fList)  
      }


  }, [isFilterActive])

  const updateInventory = async () => {
    const q = query(collection(db, "items"))

    const qSnapshots = await getDocs(q)

    let documentArray:any = []

    qSnapshots.forEach((document: any) => {
      let obj = document.data()
      obj.id = document.id
      documentArray.push(obj)
    })
    setItemList(documentArray)
  }

  
  const filterItems = (stringFilter:string) => {
    return itemList.filter(item => item.itemName.includes(stringFilter))
  }

  function DisplayItems() {
    if (isFilterActive) {
      return (
        <Box>
          {filteredItems.map(item => {
            return (
              <Box display="flex" alignItems="center" sx={{boxShadow: 2, borderRadius: "5px"}} mt={2} ml={5} mr={5} key={item.id}>
                <Typography flex={1} m={1} align="center">{item.itemName}</Typography>
                <Box  flex={1} m={1} display="flex" justifyContent="center" alignItems="center">
                  <DecrementCountDialogButton associatedDocId={item.id} currentCount={item.itemCount} updateInventory={updateInventory}/>
                  <Typography mr={2} ml={2}>{item.itemCount}</Typography>
                  <IncrementCountDialogButton associatedDocId={item.id} currentCount={item.itemCount} updateInventory={updateInventory}/>
                  <RemoveItemDialogue associatedDocId={item.id} updateInventory={updateInventory}/>
                </Box>
                
              </Box>
            )
          })}           
        </Box>
      )
    }

    return (
      <Box>
          {itemList.map(item => {
            return (
              <Box display="flex" alignItems="center" sx={{boxShadow: 2, borderRadius: "5px"}} mt={2} ml={5} mr={5} key={item.id}>
                <Typography flex={1} m={1} align="center">{item.itemName}</Typography>
                <Box  flex={1} m={1} display="flex" justifyContent="center" alignItems="center">
                  <DecrementCountDialogButton associatedDocId={item.id} currentCount={item.itemCount} updateInventory={updateInventory}/>
                  <Typography mr={2} ml={2}>{item.itemCount}</Typography>
                  <IncrementCountDialogButton associatedDocId={item.id} currentCount={item.itemCount} updateInventory={updateInventory}/>
                  <RemoveItemDialogue associatedDocId={item.id} updateInventory={updateInventory}/>
                </Box>
                
              </Box>
            )
          })} 
      </Box>
    )
  }
  return (
    <main>
      <Container fluid>
        <Box align="center" p={1} m={2}>
          <Typography variant="h4">Inventory Genie</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <SearchBar 
            filterString={filterString} 
            setFilterString={setFilterString}
            setIsFilterActive={setIsFilterActive}
            filterItems={filterItems}
          />
          <AddItemDialogue updateInventory={updateInventory}/> 
       </Box>
        {/* List */}
        <Stack spacing={2} display="block" > 
            <Box display="flex" ml={5} mr={5} >
              <Typography flex={1} m={1} align="center">Item Name</Typography>
              <Typography flex={1} m={1} align="center">Count</Typography>
            </Box>
            <DisplayItems/>

        </Stack>
      </Container>
    </main>
  );
}
