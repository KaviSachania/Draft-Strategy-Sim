from django.http import JsonResponse
from ffdraft.serializers import DistributionSerializer
from ffdraft.models import Distribution

from rest_framework.decorators import api_view

from bson import ObjectId
import csv


@api_view(['GET'])
def get_all_distributions(request):
    scoring = request.GET.get('scoring')
    teams = request.GET.get('teams')
    if scoring is not None:
        if teams is not None:
            queryset = Distribution.objects.filter(scoring=scoring, teams=teams)
        else:
            queryset = Distribution.objects.filter(scoring=scoring)
    elif teams is not None:
        queryset = Distribution.objects.filter(teams=teams)
    else:
        queryset = Distribution.objects.all()

    response = DistributionSerializer(queryset, many=True).data
    return JsonResponse(response, safe=False)


@api_view(['GET'])
def get_distribution_by_id(request, distribution_id):
    print(distribution_id)

    queryset = Distribution.objects.get(_id=ObjectId(distribution_id))
    response = DistributionSerializer(queryset, many=False).data
    return JsonResponse(response, safe=False)


def insert_distribution(request):

    scoring = ['Standard', 'PPR']

    for scoringI in range(2):

        for i in range(3):
            teams = 8+(i*2)

            with open('distributions'+scoring[scoringI]+str(teams)+'.csv', newline='') as f:
                reader = csv.reader(f)
                distributions = list(reader)

            for pos_i, pos in enumerate(distributions):
                for pick_i, pick in enumerate(pos):
                    temp_dist = distributions[pos_i][pick_i]
                    distributions[pos_i][pick_i] = temp_dist[1:len(temp_dist)-1].split(', ')
                    for dist_i, dist in enumerate(distributions[pos_i][pick_i]):
                        distributions[pos_i][pick_i][dist_i] = float(dist)

            with open('means'+scoring[scoringI]+str(teams)+'.csv', newline='') as f:
                reader = csv.reader(f)
                means = list(reader)

            for pos_i, pos in enumerate(means):
                for pick_i, pick in enumerate(pos):
                    means[pos_i][pick_i] = float(means[pos_i][pick_i])

            Distribution.objects.create(
                scoring=scoring[scoringI],
                teams=teams,
                data={
                    'distributions': distributions,
                    'means': means
                }
            )

    return None
