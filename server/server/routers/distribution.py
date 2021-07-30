from django.urls import path
from ffdraft.controllers import distribution


class DistributionRouter:
    urls = [
        path('', distribution.get_all_distributions),
        path('<distribution_id>/', distribution.get_distribution_by_id),
        #path('insert/', distribution.insert_distribution)
    ]
