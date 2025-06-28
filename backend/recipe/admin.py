from django.contrib import admin
from recipe.models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ["recipe_title", "ingredients", "steps", "difficulty_level", "spicy_level", "meal_type"]