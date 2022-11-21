from django.shortcuts import render
from django.http import JsonResponse
from numpy import product 
# Create your views here.
from ecomm.models import User

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from ecomm.serializers import UserSerializer,UserSerializerWithToken,ProductSerializer 
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework import status
from ecomm.models import Product


@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/update/<id>/',
    ]
    return JsonResponse(request,safe=False)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     #this changes the data passed in our access token 
    #     token['email'] = user.email
    #     token['message']='hello world'
    #     # ...

    #     return token
    
    #custom value
    def validate(self, attrs):
        # we are customizing our validate method and  we are serializing more information about our users 
        data= super().validate(attrs)
        # data['email']=self.user.email
        # data['username']=self.user.username
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    # all we are doing is chnaging the serializer class that actually returns back the user data 
    serializer_class = MyTokenObtainPairSerializer


# as we preferably only want to create a new resource or replaces a representation of the target resource with the request payload we use put request here
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    
    #remember we get the user object form the token we send not the default django auth user 
    user=request.user
    serializer=UserSerializerWithToken(user,many=False)
    #give  us back the new information with our required fields 
    data=request.data

    user.first_name=data['name']
    user.username=data['email']
    if data['email']!='':
        user.email=data['email']

    if data['password']!='':
        user.password=make_password(data['password'])

    user.save()
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data=request.data 
    #create user in the database 
    try:    
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={'detail':'User with this email already exist'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    #to return the jsonRepsonse of the user created in pur database



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


# as we preferably only want to create a new resource or replaces a representation of the target resource with the request payload we use put request here
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserByAdmin(request,pk):
    
    #remember we get the user object form the token we send not the default django auth user 
    user=User.objects.get(id=pk)
    
    #give  us back the new information with our required fields 
    data=request.data

    user.first_name=data['name']
    user.username=data['email']
    if data['email']!='':
        user.email=data['email']
    
    user.is_staff=data['isAdmin']

    user.save()
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    userForDeletion=User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User Was Deleted')


   