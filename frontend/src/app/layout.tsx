import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import Image from "next/image";
import { Navbar, NavbarBrand, Container, Row } from 'reactstrap';


export const metadata: Metadata = {
  title: "Cognyte - Event Manager",
  description: "Developed by Gabriel Rodrigues Segalla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Row>
          <Navbar color="light" light expand="md">
            <Container>
              <NavbarBrand href="/" className="flex">
                <Image src="https://www.cognyte.com/wp-content/uploads/2022/02/Cognyte_Logo.svg" alt="Cognyte" width={140} height={38} priority/>             
              </NavbarBrand>
            </Container>
          </Navbar>
        </Row>
        {children}
      </body>
    </html>
  );
}
