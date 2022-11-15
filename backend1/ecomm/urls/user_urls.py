from  django.urls import path

from ecomm.views import user_views as views
urlpatterns = [
    path('login/',views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('profile/',views.getUserProfile,name='users-profile'),
    path('profile/update/',views.updateUserProfile,name='user-profile-update'),
    path('register/',views.registerUser,name='register'),
    path('',views.getUsers,name='users'),
]