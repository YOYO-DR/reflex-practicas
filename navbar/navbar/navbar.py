"""Welcome to Reflex! This file outlines the steps to create a basic app."""
import reflex as rx
from navbar import style

class State(rx.State):
  pass


def index() -> rx.Component:
    return rx.hstack(
        rx.heading("Navbar",font_size="2em"),
        rx.list(
           rx.list_item(
              rx.link(
                 "Portafolio",
                 href="https://portafolioyoiner.azurewebsites.net/"
              )
           ),
           style=style.list_navbar
        ),
        style=style.navbar
    )


# Add state and page to the app.
app = rx.App()
app.add_page(index)
app.compile()
