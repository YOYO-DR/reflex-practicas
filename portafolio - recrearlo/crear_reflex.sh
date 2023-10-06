#!/bin/bash
# el comentario de arriba le dice a Git Bash que use el intérprete de Bash para ejecutar los comandos.
python -m venv env && source env/Scripts/activate && pip install -r requirements.txt && reflex init