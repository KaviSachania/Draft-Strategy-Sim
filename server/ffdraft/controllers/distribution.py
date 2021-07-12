from django.http import JsonResponse
from ffdraft.serializers import DistributionSerializer
from ffdraft.models import Distribution


def get_all_distributions(request):
    queryset = Distribution.objects.all()
    response = DistributionSerializer(queryset, many=True).data
    return JsonResponse(response, safe=False)


def get_distribution_by_id(request, distribution_id):
    queryset = Distribution.objects.get(id=distribution_id)
    response = DistributionSerializer(queryset, many=False).data
    return JsonResponse(response, safe=False)
