from flask_marshmallow import Marshmallow

import pycad.models as models
from pycad import app

marshmallow = Marshmallow(app)


class UserSchema(marshmallow.ModelSchema):
    class Meta:
        model = models.User
