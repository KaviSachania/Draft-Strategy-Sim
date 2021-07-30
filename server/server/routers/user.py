from django.urls import path
from ffdraft.controllers import user


class UserRouter:
    urls = [
        path('login/', user.login_user),
        path('logout/', user.logout_user),
        path('register/', user.register),
        # path('delete/', user.delete),
        # path('password/', user.change_password),
    ]
