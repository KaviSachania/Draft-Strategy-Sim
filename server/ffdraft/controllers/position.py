from django.http import JsonResponse
from ffdraft.serializers import PositionSerializer
from ffdraft.models import Position

from rest_framework.decorators import api_view


@api_view(['GET'])
def get_all_positions(request):
    queryset = Position.objects.all()
    response = PositionSerializer(queryset, many=True).data
    return JsonResponse(response, safe=False)


@api_view(['GET'])
def get_position_by_id(request, position_id):
    queryset = Position.objects.get(_id=position_id)
    response = PositionSerializer(queryset, many=False).data
    return JsonResponse(response, safe=False)
