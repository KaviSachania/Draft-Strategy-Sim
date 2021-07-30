from django.http import JsonResponse
from django.http import HttpResponse
from ffdraft.serializers import LineupSerializer
from ffdraft.models import Lineup

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import api_view


@api_view(['GET'])
def login_user(request):
    username = 'john'
    password = 'johnpassword'
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@api_view(['GET'])
def logout_user(request):
    logout(request)

    return HttpResponse(status=200)


@api_view(['GET'])
def register(request):
    # username = request.POST['username']
    # password = request.POST['password']

    user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
    user.save()

    # need to check for successful creation

    return login_user(request._request)
