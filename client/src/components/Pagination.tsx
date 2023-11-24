import { Flex,Button,Text } from "@chakra-ui/react"

interface Props {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
}

const Pagination = ({page,setPage,totalPages}: Props) => {
    const togglePage = (op: string) => {
        switch(op) {
            case '+':
                if(page < totalPages) {
                    setPage(prev => prev+1);
                }
                break;
            case '-':
                if(page > 1) {
                    setPage(prev => prev-1);
                }
                break;
        }
    }
    return (
        <Flex my = {"2rem"} alignItems={"center"} gap={"1rem"}>
        <Button bgColor = {"black"} color = {"white"} _hover={{color: "black",bgColor: "white",transform :"scale(1.1)"}} onClick={() => togglePage('-')}>Prev</Button>
        <Text color = {"white"} fontWeight={"700"} textShadow={"0px 2px 2px black"} cursor={"context-menu"}>Page {page} of {totalPages}</Text>
        <Button bgColor = {"black"} color = {"white"} _hover={{color: "black",bgColor: "white",transform :"scale(1.1)"}} onClick={() => togglePage('+')}>Next</Button>
        </Flex>
    )
}

export default Pagination
