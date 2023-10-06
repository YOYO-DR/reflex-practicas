import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Center, Container, Divider, Heading, HStack, Input, Link, ListItem, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, OrderedList, Text, useColorMode, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
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

  const ref_new_item = useRef(null); refs['ref_new_item'] = ref_new_item;

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
  <Container>
  <VStack sx={{"bg": "#ededed", "margin": "5em", "padding": "1em", "borderRadius": "0.5em", "shadow": "lg"}}>
  <Heading>
  {`Todos`}
</Heading>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("state.add_item", {form_data:{"new_item": getRefValue(ref_new_item)}})], (_e0))}>
  <Input id={`new_item`} placeholder={`Add a todo...`} ref={ref_new_item} sx={{"bg": "white"}} type={`text`}/>
  <Center>
  <VStack>
  <Button sx={{"bg": "white"}} type={`submit`}>
  {`Add`}
</Button>
  <Link as={NextLink} href={`https://portafolioyoiner.azurewebsites.net/notas/django/`} rel={`noopener noreferrer`} sx={{"border": "1px solid", "borderRadius": "5px", "padding": "5px"}}>
  {`Portafolio`}
</Link>
</VStack>
</Center>
</Box>
  <Divider/>
  <OrderedList>
  {state.items.map((bsqpflbb, i) => (
  <ListItem key={i}>
  <HStack>
  <Button onClick={(_e) => addEvents([Event("state.finish_item", {item:bsqpflbb})], (_e))} sx={{"height": "1.5em", "backgroundColor": "white", "border": "1px solid blue"}}/>
  <Text sx={{"fontSize": "1.25em"}}>
  {bsqpflbb}
</Text>
</HStack>
</ListItem>
))}
</OrderedList>
</VStack>
</Container>
  <NextHead>
  <title>
  {`Todo App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
