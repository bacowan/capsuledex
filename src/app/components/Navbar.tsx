import { getUser } from "@/lib/getUser";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const user = await getUser()

  return <NavbarClient isLoggedIn={!!user}/>
}
