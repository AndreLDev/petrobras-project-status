'use client'

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Image} from "@nextui-org/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Perfil",
    "Pagina inicial",
    "Buscar Contratação",
    "Log Out",
  ];



  return (
    <Navbar position='sticky' maxWidth='full' className="text-black bg-green-400" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Image width={40} height={40} src="https://logospng.org/download/petrobras/logo-petrobras-escudo-256.png"/>
          <p className="font-bold text-inherit px-2">PSC</p>
        </NavbarBrand>
      </NavbarContent>

      <h2 className="text-xs sm:text-base">Plataforma de Status de Contratos</h2>
      
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link className="text-xs sm:text-base" href="login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button className="text-xs sm:text-base" as={Link} href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu  className="bg-green-500 lg:w-1/6 sm:w-full" >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className={index === menuItems.length - 1 ? "" : "text-white"}
              href={index === 2 ? 'contratacao' : index === 1 ? '../' : ''}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
