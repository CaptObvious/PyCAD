import json
import re

from flask import g, redirect, send_file, session
from flask_openid import OpenID
from flask_session import Session

import pycad.controllers as controllers
import pycad.models as models
import pycad.schemas as schemas
from pycad import app
from pycad.config import config

STEAM_ID_REGEX = re.compile("steamcommunity.com/openid/id/(.*?)$")

app.config["SESSION_TYPE"] = config["session_storage_type"]
app.secret_key = config["secret_key"]

Session(app)
oid = OpenID(app)


@app.route("/login_redirect")
@oid.loginhandler
def login():
    if session.get("user_id", None) is not None:
        return redirect(oid.get_next_url())

    return oid.try_login("https://steamcommunity.com/openid")


@oid.after_login
def after_login(response):
    session["user_id"] = STEAM_ID_REGEX.search(response.identity_url).group(1)
    g.user = models.User.get_or_create(session["user_id"])

    return redirect(oid.get_next_url())


@app.route("/logout")
def logout():
    session.pop("user_id", None)
    g.user = None

    return redirect(oid.get_next_url())


@app.route("/")
@app.route("/<path:path>")
def index(path="index.html"):
    allowed_prefixes = [
        "css",
        "fonts",
        "images",
        "js"
    ]

    # If they're not requesting static assets we return index.html as this allows single page applications to
    # be deeplinked
    if path.split("/")[0] not in allowed_prefixes:
        return send_file("../static/index.html")

    return send_file("../static/" + path)


@app.route("/api")
@app.route("/api/<path:path>")
def api(path=""):
    return "API!  " + path + "<br />" + session.get("user_id", ""), 200


@app.route("/api/user")
def current_user():
    if not (session.get("user_id", None)):
        return "Unauthorized.", 401

    return user_by_id(session["user_id"])


@app.route("/api/user/<user_id>")
def user_by_id(user_id):
    user = models.User.get_or_create(user_id)

    return json.dumps(schemas.UserSchema().dump(user), indent=4)
