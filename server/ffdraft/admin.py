from django.contrib import admin
from .models import Distribution
from .models import Lineup
from .models import Position


class DistributionAdmin(admin.ModelAdmin):
    list_display = ('_id', 'scoring', 'teams', 'data')


class LineupAdmin(admin.ModelAdmin):
    list_display = ('_id', 'scoring', 'teams', 'rounds', 'starters', 'pick', 'score', 'players')


class PositionAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name', 'color')


admin.site.register(Distribution, DistributionAdmin)
admin.site.register(Lineup, LineupAdmin)
admin.site.register(Position, PositionAdmin)
