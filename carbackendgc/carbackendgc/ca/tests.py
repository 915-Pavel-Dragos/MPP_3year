from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from ca.models import Car, Incident


class CarIncidentAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='user', password='testpass')
        self.client.force_authenticate(user=self.user)

        self.car = Car.objects.create(name="Toyota", horsepower=150, color="Red", year=2020, country="Japan")
        self.incident = Incident.objects.create(description="Minor scratch", location="Parking lot",
                                                date="2023-05-01T14:30:00Z", car=self.car)

    def test_get_all_cars(self):
        response = self.client.get(reverse('car-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)

    def test_get_car_incidents(self):
        url = reverse('get_incidents_by_car', args=[self.car.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_horsepower_filter(self):
        url = reverse('get_cars_by_horsepower', args=[150])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_register_user(self):
        data = {
            'username': 'newuser',
            'password': 'password123',
            'email': 'newuser@example.com'
        }
        response = self.client.post(reverse('register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        self.client.logout()
        data = {
            'username': 'user',
            'password': 'testpass'
        }
        response = self.client.post(reverse('token_obtain_pair'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_profile_access(self):
        response = self.client.get(reverse('profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_hello_world(self):
        response = self.client.get(reverse('hello'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Hello, world!")

    def test_get_horsepowers(self):
        response = self.client.get(reverse('horsepowers'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(150,response.data)