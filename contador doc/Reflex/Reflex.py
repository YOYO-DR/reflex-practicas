import reflex as rx


class State(rx.State):
    count: int = 0

    def increment(self):
        self.count += 1
        self.imprimirValor()

    def decrement(self):
        self.count -= 1
        self.imprimirValor()

    def imprimirValor(self):
        print(self.count)

# inicio
def index():
    return rx.vstack(
        rx.hstack(
        rx.button(
            "Decrement",
            color_scheme="red",
            border_radius="1em",
            on_click=State.decrement,
        ),
        rx.heading(State.count, font_size="2em"),
        rx.button(
            "Increment",
            color_scheme="green",
            border_radius="1em",
            on_click=State.increment,
        ),
        
    )
)

# about
def about():
    return rx.vstack(
        rx.hstack(
            rx.text("Sobre nosotros",font_size="2em")
        )
    )

app = rx.App()
app.add_page(index,route="/")
app.add_page(about,route="/about")
app.compile()