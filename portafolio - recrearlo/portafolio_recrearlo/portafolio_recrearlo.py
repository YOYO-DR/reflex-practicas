"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from portafolio_recrearlo import style
from portafolio_recrearlo.componentes import Base
from rxconfig import config

import reflex as rx

docs_url = "https://reflex.dev/docs/getting-started/introduction"
filename = f"{config.app_name}/{config.app_name}.py"


class State(rx.State):
    """The app state."""

    pass


def index() -> rx.Component:
    return Base(
        rx.vstack(
            rx.hstack(
                rx.image(src="perfil.jpg"),
                rx.vstack(
                    rx.heading("Hola, me llamo Yoiner"),
                    rx.heading("Soy aprendiz en ser desarrollador Fullstack"),
                    rx.text("Soy estudiante de Servicio Nacional de Aprendizaje SENA, donde estoy cursando Analisis y Desarrollo de Sistemas de Información (ADSI). Además, me he dedicado a aprender de forma autodidacta Frontend y Backend utilizando tecnologías como HTML, CSS, Bootstrap y JavaScript para Frontend, y Python con los Frameworks Django y Django Rest para la creación de API REST en el Backend. También tengo experiencia en el manejo de bases de datos con MySQL."),
                    rx.text("Durante mi aprendizaje, he realizado diversos proyectos personales con el objetivo de mejorar mis habilidades en el ámbito Fullstack. Estoy entusiasmado por aplicar mis conocimientos en diferentes contextos, ya sea trabajando para una empresa o colaborando en proyectos. Mi objetivo es adquirir experiencia en el mercado laboral y seguir perfeccionando mis habilidades."),
                    rx.button("Descargar CV")
                )
            ),
        )
    )

# Add state and page to the app.
app = rx.App()
app.style=style.style_app
app.add_page(index)
app.compile()
