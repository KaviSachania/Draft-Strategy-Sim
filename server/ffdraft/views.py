from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DistributionSerializer
from .models import Distribution


class DistributionView(viewsets.ModelViewSet):
    serializer_class = DistributionSerializer
    queryset = Distribution.objects.all()
