import { InputGroup,Input,InputLeftElement } from "@chakra-ui/react"
import React from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
  setMovieName: React.Dispatch<React.SetStateAction<string>>
}

const SearchBox = ({setMovieName}: Props) => {
  return (
      <InputGroup boxShadow={'1px 1px 22px 2px gray'} borderRadius={'8px'} >
        <InputLeftElement pointerEvents='none' mt = {'0.3rem'}>
            <CiSearch />
        </InputLeftElement>
        <Input placeholder='Enter a movie title' p = {'1.5rem 2rem'} onChange = {(e) => setMovieName(e.target.value)}/>
    </InputGroup>
  )
}

export default SearchBox
