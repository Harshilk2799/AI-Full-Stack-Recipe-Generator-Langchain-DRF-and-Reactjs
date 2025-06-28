from django.urls import path
from recipe import views

urlpatterns = [
    path("recipe/", views.RecipeAPI.as_view(), name="recipe"),
]