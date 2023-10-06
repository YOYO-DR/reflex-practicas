import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Center, Heading, HStack, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode, VStack } from "@chakra-ui/react"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents.map((e) => ({...e})))
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {`http://localhost:8000`}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <Center>
  <VStack sx={{"bg": "black", "color": "white", "width": "1200px", "padding": "20px"}}>
  <HStack>
  <Heading>
  {`Yoiner (Por ahora de prueba jeje)`}
</Heading>
</HStack>
  <VStack>
  <HStack>
  <Image src={`perfil.jpg`}/>
  <VStack>
  <Heading>
  {`Hola, me llamo Yoiner`}
</Heading>
  <Heading>
  {`Soy aprendiz en ser desarrollador Fullstack`}
</Heading>
  <Text>
  {`Soy estudiante de Servicio Nacional de Aprendizaje SENA, donde estoy cursando Analisis y Desarrollo de Sistemas de Información (ADSI). Además, me he dedicado a aprender de forma autodidacta Frontend y Backend utilizando tecnologías como HTML, CSS, Bootstrap y JavaScript para Frontend, y Python con los Frameworks Django y Django Rest para la creación de API REST en el Backend. También tengo experiencia en el manejo de bases de datos con MySQL.`}
</Text>
  <Text>
  {`Durante mi aprendizaje, he realizado diversos proyectos personales con el objetivo de mejorar mis habilidades en el ámbito Fullstack. Estoy entusiasmado por aplicar mis conocimientos en diferentes contextos, ya sea trabajando para una empresa o colaborando en proyectos. Mi objetivo es adquirir experiencia en el mercado laboral y seguir perfeccionando mis habilidades.`}
</Text>
  <Button>
  {`Descargar CV`}
</Button>
</VStack>
</HStack>
</VStack>
  <HStack>
  <Heading>
  {`Todos los derechos reservados`}
</Heading>
</HStack>
</VStack>
</Center>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
