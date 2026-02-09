from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('equipment.urls')),
    path('api-auth/', include('rest_framework.urls')),  # login/logout
]
