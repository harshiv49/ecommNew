from django.shortcuts import render

# Create your views here.
from ecomm.models import User

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response

from ecomm.serializers import ProductSerializer 
from rest_framework.permissions import IsAdminUser,IsAuthenticated

from rest_framework import status
from ecomm.models import Product


#multiple prooducts
@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)    
    return Response(serializer.data) 


#single prooduct
@api_view(['GET'])
def getProduct(request,pk):
    productRequired=Product.objects.get(_id=pk)
    serializer=ProductSerializer(productRequired,many=False)  
    return Response(serializer.data) 