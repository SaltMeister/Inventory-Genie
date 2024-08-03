import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { InputAdornment, TextField } from "../node_modules/@mui/material/index";
export default function SearchBar({filterString, setFilterString, setIsFilterActive, filterItems} : {filterString:string, setFilterString:Function, setIsFilterActive:Function, filterItems:Function}) {
  
  const handleKeyPress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsFilterActive(true)
      console.log('Submitted value:', filterString);
    }
  }; 

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
          } 

          setFilterString(event.target.value);          
        }}
        onKeyPress={handleKeyPress}
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