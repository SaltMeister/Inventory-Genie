import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { InputAdornment, TextField } from "../node_modules/@mui/material/index";
export default function SearchBar({filterString, setFilterString, setIsFilterActive} : {filterString:string, setFilterString:Function, setIsFilterActive:Function}) {
  
  return(
    <React.Fragment>
      <TextField
        margin="dense"
        id="searchFilter"
        name="searchFilter"
        type="text"
        value={filterString}
        label="Search Item"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if(event.target.value.length <= 0) {
            setIsFilterActive(false)
            setFilterString(event.target.value);    
            return
          } 
          
          setIsFilterActive(true)
          setFilterString(event.target.value);    
                
        }}
        variant="standard"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size="small" />
            </InputAdornment>
          ),
        }}
        /> 


    </React.Fragment>
  )
}