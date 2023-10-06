"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from rxconfig import config
from dotenv import load_dotenv

# no funciona porque tengo que pagar la api de openai :v
load_dotenv("./.env")
print("Loading environment variables for .env file")
import reflex as rx
from chatapp_doc import style
import os, openai
openai.api_key = os.environ["OPENAI_API_KEY"]

class State(rx.State):

    # The current question being asked.
    question: str

    # Keep track of the chat history as a list of (question, answer) tuples.
    chat_history: list[tuple[str, str]]

    def answer(self):
      # Our chatbot has some brains now!
      session = openai.ChatCompletion.create(
          model="gpt-3.5-turbo",
          messages=[
              {"role": "user", "content": self.question}
          ],
          stop=None,
          temperature=0.7,
          stream=True,
      )

      # Add to the answer as the chatbot responds.
      answer = ""
      self.chat_history.append((self.question, answer))

      # Clear the question input.
      self.question = ""
      # Yield here to clear the frontend input before continuing.
      yield

      for item in session:
          if hasattr(item.choices[0].delta, "content"):
              answer += item.choices[0].delta.content
              self.chat_history[-1] = (
                  self.chat_history[-1][0],
                  answer,
              )
              yield


# componentes
def qa(question: str, answer: str) -> rx.Component:
    return rx.box(
        rx.box(
            rx.text(question,style=style.question_style), text_align="right"
        ),
        rx.box(
            rx.text(question,style=style.answer_style), text_align="left"
        ),
        margin_y="1em",
    )

def chat() -> rx.Component:
    return rx.box(
        # esto resive lo que va a recorrer y una funcion (en este caso lambda) la cual ira creando los componentes en el chat
        rx.foreach(
            State.chat_history,
            lambda messages: qa(messages[0],messages[1]),
        )
    )

def action_bar() -> rx.Component:
    return rx.hstack(
        rx.input(
            value=State.question,
            placeholder="Ask a question",
            style=style.input_style,
            # este set_question modifica el atributo question cada vez que se escribe en el input
            on_change=State.set_question
        ),
        rx.button("Ask",style=style.button_style,on_click=State.answer),
    )

# pagina
def index() -> rx.Component:
    return rx.container(
        chat(),
        action_bar(),
    )
# Add state and page to the app.
app = rx.App()
app.add_page(index)
app.compile()
