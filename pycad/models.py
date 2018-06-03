import json
from urllib.parse import urlencode

from hyper import HTTPConnection

from pycad.config import config
from pycad.db import db


class User(db.Model):
    id = db.Column(db.String(17), primary_key=True)
    name = db.Column(db.String(200))
    nickname = db.Column(db.String(200))
    avatar_url = db.Column(db.String(200))
    steam_profile_url = db.Column(db.String(200))
    admin = db.Column(db.Boolean, default=False)

    @classmethod
    def get_or_create(cls, user_id):
        user = cls.query.get(user_id)

        if not user:
            steam_api_connection = HTTPConnection("api.steampowered.com")
            query_parameters = {
                "key": config["steam_api_key"],
                "steamids": user_id
            }

            steam_api_connection.request(
                "GET",
                "/ISteamUser/GetPlayerSummaries/v0001/?{}".format(urlencode(query_parameters))
            )

            steam_response = json.loads(steam_api_connection.get_response().read().decode("utf-8"))

            steam_data = steam_response['response']['players']['player'][0] or {}

            user = cls(
                id=user_id,
                name=steam_data.get("realname", None),
                nickname=steam_data.get("personaname", None),
                avatar_url=steam_data.get("avatarfull", None),
                steam_profile_url=steam_data.get("profileurl", None)
            )

            db.session.add(user)
            db.session.commit()

        return user
