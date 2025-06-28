from django.db import models

class Recipe(models.Model):
    DIFFICULTY_LEVEL = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced")
    ]
    SPICY_LEVEL = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High")
    ]
    MEAL_TYPE = [
        ("Breakfast", "Breakfast"),
        ("Lunch", "Lunch"),
        ("Dinner", "Dinner"),
        ("Snack", "Snack"),
        ("Dessert", "Dessert")
    ]
    recipe_title = models.CharField(max_length=255)
    ingredients = models.JSONField(help_text="List of ingredients with quantity and unit", null=True, blank=True)
    steps = models.JSONField(help_text="Step-by-step instructions", null=True, blank=True)
    difficulty_level = models.CharField(max_length=30, choices=DIFFICULTY_LEVEL, null=True, blank=True)
    spicy_level = models.CharField(max_length=10, choices=SPICY_LEVEL, null=True, blank=True)
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPE, null=True, blank=True)

