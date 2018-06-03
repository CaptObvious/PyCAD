from flask import Flask

app = Flask(__name__)

import pycad.config
import pycad.db
import pycad.web

if __name__ == "__main__":
    web.app.run()
