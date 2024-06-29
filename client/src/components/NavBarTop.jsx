//import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import Logo from '../components/Logo'

function NavBarTop() {
  return (
    <Navbar className="bg-olive" maxWidth="full">
      <NavbarBrand>
        <Logo size={40}></Logo>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <h1 className='font-bold text-2xl p-0 font text-olive-text'>Tasks.</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              radius="lg"
              as="button"
              className="transition-transform"
              name="Kanchon"
              size="md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZaU_o60IwNkACgp-ym8ntEBLKs9oM8Qwcg&s"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">Kanchon Sen Gupta</p>
            </DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>

            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBarTop