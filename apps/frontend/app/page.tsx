import UserList from "@/components/organisms/UserList";
import BaseContainer from "@/components/template/BaseContainer";
import { Box } from "@mui/material";

import Navbar from "@/components/organisms/Navbar";
import UserAction from "@/components/organisms/UserAction";

export default function Home() {

  return (
    <>
      <Navbar />
      <BaseContainer>
        <Box sx={{ width: "50%", mx: "auto", marginTop: 6 }}>
          <UserAction />
          <UserList />
        </Box>
      </BaseContainer>
    </>
  )
}