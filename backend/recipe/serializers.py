from rest_framework import serializers
from recipe.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ["recipe_title", "ingredients", "steps", "difficulty_level", "spicy_level", "meal_type"]