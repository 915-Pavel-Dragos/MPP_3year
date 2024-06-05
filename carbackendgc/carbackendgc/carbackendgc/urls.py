from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from ca.views import HelloWorld, RegisterView, ProfileView, CarViewSet, IncidentViewSet, get_horsepowers, \
    get_incidents_by_car, get_cars_by_horsepower

router = DefaultRouter()
router.register(r'cars', CarViewSet)
router.register(r'incidents', IncidentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('horsepowers/', get_horsepowers, name='horsepowers'),
    path('cars/incidents/<int:car_id>', get_incidents_by_car, name='get_incidents_by_car'),
    path('cars/horsepower/<int:horsepower>/', get_cars_by_horsepower, name='get_cars_by_horsepower'),
    path('hello/', HelloWorld.as_view(), name='hello'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
