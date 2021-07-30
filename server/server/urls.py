"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings

from .routers.distribution import DistributionRouter
from .routers.lineup import LineupRouter
from .routers.position import PositionRouter
from .routers.user import UserRouter

router = routers.DefaultRouter()

distribution_router = DistributionRouter()
lineup_router = LineupRouter()
position_router = PositionRouter()

user_router = UserRouter()

urlpatterns = [
    path('distributions/', include(distribution_router.urls)),
    # path('lineups/', include(lineup_router.urls)),
    # path('positions/', include(position_router.urls)),
    # path('users/', include(user_router.urls))
]

if settings.DEBUG:
    urlpatterns.append(path('admin/', admin.site.urls))
    # urlpatterns.append(path('api/', include(router.urls)))
