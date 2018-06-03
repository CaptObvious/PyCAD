from setuptools import setup

setup(
    name="PyCAD",
    version="0.1",
    long_description=__doc__,
    packages=["pycad"],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        "Flask",
        "Hyper",
        "SQLAlchemy",
        "Marshmallow",
        "Flask-OpenID",
        "Flask-Session",
        "Flask-SQLAlchemy",
        "Flask-Marshmallow",
        "Marshmallow-SQLAlchemy"
    ],
    extras_require={
        "dev": [
            "pytest",
            "pytest-pep8",
            "pytest-cov"
        ]
    }
)
