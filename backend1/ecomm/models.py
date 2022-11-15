import decimal
from email.policy import default
from tokenize import blank_re
import django
from django.db import models
from django.contrib.auth.models import AbstractUser
from sqlalchemy import null 
from .managers import UserManager
# Create your models here.
#AbstractUser class already has  
class User(AbstractUser):
    username=models.CharField(max_length=14,null=True,blank=True)
    email=models.EmailField(unique=True)
    mobile=models.CharField(max_length=14)
    is_verified=models.BooleanField(default=False)
    email_token=models.CharField(max_length=100,null=True,blank=True)
    forget_password=models.CharField(max_length=100,null=True,blank=True)
    last_login_time=models.DateTimeField(null=True,blank=True)
    last_logout_time=models.DateTimeField(null=True,blank=True)
    objects=UserManager()
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

class Product(models.Model):
    #user can have multiple products we dont want child to be deleted if the parent that is the user is deleted 
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    image=models.ImageField(null=True,blank=True)
    brand=models.CharField(max_length=200,null=True,blank=True)
    category=models.CharField(max_length=200,null=True,blank=True)
    description=models.TextField(null=True,blank=True)
    rating=models.DecimalField(max_digits=7,decimal_places=2,null=True)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=10,decimal_places=2,null=True)
    countInStock=models.IntegerField(null=True,blank=True,default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True,blank=True)
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    rating=models.IntegerField(null=True,blank=True,default=0)
    comment=models.TextField(null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.product.name

class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    paymentMethod=models.CharField(max_length=200,null=True,blank=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    totalPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True)
    shippingPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True)
    taxPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True) 
    isPaid=models.BooleanField(default=False,null=True,blank=True)
    paidAt=models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered=models.BooleanField(default=False)
    deliveredAt=models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)

    
    def __str__(self):
        return self.createdAt



class OrderItem(models.Model):
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order=models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    quantity=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2,null=True)
    # we are going to add the url here andnnot upload the image 
    image=models.CharField(max_length=200,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)

    
    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order=models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
    address=models.TextField(null=True,blank=True)
    city=models.CharField(max_length=200,null=True,blank=True)
    state=models.CharField(max_length=200,null=True,blank=True)
    postalCode=models.IntegerField(null=True,blank=True,default=0)
    country=models.CharField(max_length=200,null=True,blank=True)
    shippingPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True)
    _id=models.AutoField(primary_key=True,editable=False)

    
    def __str__(self):
        return self.name


