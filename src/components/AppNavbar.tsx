import { userStore } from "../state/userStore";
import {Models} from "appwrite"
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import LogoutModel from "./LogoutModal";

export default function AppNavbar() {

    const user=userStore((state)=>state.user) as
    Models.User<Models.Preferences>
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Connectify</p>
      </NavbarBrand>
      <NavbarItem>
        <h1 className="font-bold">{user.name}</h1>
      </NavbarItem>
      <NavbarItem className="hidden">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <LogoutModel/>
      </NavbarItem>
    </Navbar>
  );
}
