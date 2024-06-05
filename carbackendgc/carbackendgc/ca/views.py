from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, pagination, viewsets
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .models import Incident, Car
from .serializers import UserSerializer, RegisterSerializer, IncidentSerializer, CarSerializer


class StandardPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    pagination_class = StandardPagination


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = StandardPagination


@api_view(['GET'])
def get_horsepowers(request):
    horsepowers = Car.objects.values_list('horsepower', flat=True).distinct()
    return Response(horsepowers)


@api_view(['GET'])
def get_incidents_by_car(request, car_id: int):
    incidents = Incident.objects.filter(car_id=car_id)
    serializer = IncidentSerializer(incidents, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_cars_by_horsepower(request, horsepower):
    try:
        if horsepower == 0:
            cars = Car.objects.all()
        else:
            cars = Car.objects.filter(horsepower=horsepower)
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HelloWorld(APIView):
    def get(self, request):
        return Response({"message": "Hello, world!"}, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)