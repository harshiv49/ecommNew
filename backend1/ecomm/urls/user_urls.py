from  django.urls import path

from ecomm.views import user_views as views
urlpatterns = [
    path('login/',views.MyTokenObtainPairView.as_view(),name='token-obtain-pair'),
    path('profile/',views.getUserProfile,name='users-profile'),
    path('profile/update/',views.updateUserProfile,name='user-profile-update'),
    path('register/',views.registerUser,name='register'),
    path('',views.getUsers,name='users'),
    #place this one down in hierarachy because if we for example right profile it is going to think profile is our passed in id 
      path('<str:pk>/',views.getUserById,name='user'),
    path('delete/<str:pk>/',views.deleteUser,name='user-delete'),
    path('update/<str:pk>/',views.updateUserByAdmin,name='user-admin-update'),
    
   
]