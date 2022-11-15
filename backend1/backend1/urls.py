"""backend1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
#static which we import is a function which allows us to connect a url 
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/',include('ecomm.urls')),
     path('api/orders/',include('ecomm.urls.order_urls')),
     path('api/products/',include('ecomm.urls.product_urls')),
     path('api/users/',include('ecomm.urls.user_urls')),
]
#we are setting the url and we pass in which folder to look into 
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)