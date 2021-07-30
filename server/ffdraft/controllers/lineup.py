from django.http import JsonResponse
from django.http import HttpResponse
from ffdraft.serializers import LineupSerializer
from ffdraft.models import Lineup

from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def get_all_lineups(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            queryset = Lineup.objects.filter(user=request.user.get_username())
            response = LineupSerializer(queryset, many=True).data
            return JsonResponse(response, safe=False)
        else:
            return HttpResponse(status=501)
    else:
        return HttpResponse(status=400)


@api_view(['GET', 'DELETE'])
def get_lineup_by_id(request, lineup_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            queryset = Lineup.objects.get(_id=lineup_id, user=request.user.get_username())
            # error handle for DoesNotExist exception
            response = LineupSerializer(queryset, many=False).data
            return JsonResponse(response, safe=False)
        else:
            return HttpResponse(status=501)
    else:
        return HttpResponse(status=400)
