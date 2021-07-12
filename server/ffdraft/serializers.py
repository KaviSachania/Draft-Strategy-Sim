from rest_framework import serializers
from .models import Distribution
from .models import Lineup
from .models import Position


class DistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distribution
        fields = ('_id', 'scoring', 'teams', 'rounds', 'distributions')


class LineupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineup
        fields = ('_id', 'scoring', 'teams', 'rounds', 'pick', 'score', 'players', 'positions')


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('_id', 'name', 'color')
