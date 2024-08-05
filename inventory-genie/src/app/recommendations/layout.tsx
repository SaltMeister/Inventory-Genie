'use client'
import React, {useEffect} from "react"
import db from "../../../utils/firestore"
import { collection, getDocs, query } from "firebase/firestore";
import { GenerateRecommendation } from "../generateRecommendation"

export default function Layout() {

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

      const aiResponse = await GenerateRecommendation(documentArray);
      console.log(aiResponse);
    }

    getRecommendationFromItems();
  });
  
  

  return (
    <>
      <h3>Based off your inventory</h3>
    </>
  )
}