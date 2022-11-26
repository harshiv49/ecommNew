from ecomm.views import product_views as views
from  django.urls import path


urlpatterns = [
    path('',views.getProducts,name='products'),
     path('create/',views.createProduct,name='create'),
     path('delete/<str:pk>/',views.deleteProduct,name='delete'),
     path('update/<str:pk>/',views.updateProduct,name='update'),
     path('<str:pk>/reviews/',views.createProductReview,name='create-review'),
     path('<str:pk>/',views.getProduct,name='product'),
]







