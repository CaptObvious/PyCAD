import json
import sys
import uuid


def _load_config():
    print("LOADING CONFIG")
    try:
        with open("settings.json", "r") as file:
            settings = json.loads(file.read())
    except FileNotFoundError:
        settings = {}

    if not settings.get("database_engine", None):
        settings["database_engine"] = "sqlite"

    if not settings.get("secret_key", None):
        settings["secret_key"] = str(uuid.uuid4()) + str(uuid.uuid4()) + str(uuid.uuid4())

    if not settings.get("session_storage_type", None):
        settings["session_storage_type"] = "filesystem"

    if not settings.get("steam_api_key", None):
        sys.exit("Steam API key is required!  Set it in settings.json.")

    with open("settings.json", "w") as file:
        file.write(json.dumps(settings, indent=4))

    return settings


config = _load_config()
