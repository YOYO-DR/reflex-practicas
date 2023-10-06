import reflex as rx
from portafolio_recrearlo.style import style_base
def NavBar():
  return rx.hstack(
    rx.heading("Yoiner (Por ahora de prueba jeje)")
  )

def Footer():
  return rx.hstack(
    rx.heading("Todos los derechos reservados")
  )

def Base(content):
  return rx.center(
    rx.vstack(
    NavBar(),
    content,
    Footer(),
    style=style_base
    )
  )
