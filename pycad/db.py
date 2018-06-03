import sys

from flask_sqlalchemy import SQLAlchemy

from pycad import app
from pycad.config import config

if config["database_engine"] == "sqlite":
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pycad.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

from pycad.models import User

print("CREATING TABLES")
db.create_all()
db.session.commit()
