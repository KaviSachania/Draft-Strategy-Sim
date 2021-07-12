from django.http import JsonResponse
from ffdraft.serializers import LineupSerializer
from ffdraft.models import Lineup


def get_all_lineups(request):
    queryset = Lineup.objects.all()
    response = LineupSerializer(queryset, many=True).data
    return JsonResponse(response, safe=False)


def get_lineup_by_id(request, lineup_id):
    queryset = Lineup.objects.get(id=lineup_id)
    response = LineupSerializer(queryset, many=False).data
    return JsonResponse(response, safe=False)
