import Image from "next/image";
import Link from "../../node_modules/next/link";
import { Container, Typography, Box, Button } from "node_modules/@mui/material/index";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { firebaseConfig } from "../../env/firebaseEnvironment";
export default function Home() {

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <main>
      <Container flex>
        <Typography variant="h1">Inventory Genie</Typography>
        <Box sx={{width: 300}}>
          <Button>THIS IS A BUTTOn</Button>
        </Box>
      </Container>
    </main>
  );
}
