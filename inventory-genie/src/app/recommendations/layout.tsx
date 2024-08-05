'use client'
import React, {useEffect} from "react"
import db from "../../../utils/firestore"
import { collection, getDocs, query } from "firebase/firestore";
import { GenerateRecommendation } from "../generateRecommendation"
import { Box, Container, Typography } from "../../../node_modules/@mui/material/index";
import { useState } from 'react';

export default function Layout() {

  const [recMessage, setRecMessage] = useState("");

  useEffect(() => {
    const getRecommendationFromItems = async () => {
      const collectionRef = collection(db, "items")
      const q = query(collectionRef)

      const qSnapshots = await getDocs(q)
      let documentArray:any = []
      
      qSnapshots.forEach((document: any) => {
        let obj = document.data()
        obj.id = document.id
        documentArray.push(obj)
      })
      await GenerateRecommendation(documentArray)
        .then(response => {
          console.log(response)
          setRecMessage(response)
        })
        .catch(e => {
          console.log(e)
          setRecMessage("Error Obtaining LLM response");
        });

    }

    getRecommendationFromItems();
  });
  
  

  return (
    <Container fluid>
      <Box textAlign="center" m={5}>
        <Typography variant="h4">A Recommendation based off of your inventory</Typography>
      </Box>
      <Box>
        <Typography variant="p">{recMessage}</Typography>
      </Box>

    </Container>

  )
}