from rest_framework.views import APIView
from rest_framework.response import Response
from recipe.serializers import RecipeSerializer
from rest_framework import status
from recipe.langchain_script import recipe_generate

class RecipeAPI(APIView):
    def post(self, request):
        serializer = RecipeSerializer(data = request.data)
        if serializer.is_valid():
            recipe = serializer.save()
            obj = recipe_generate(serializer.data.get("recipe_title"))

            recipe.ingredients = obj["ingredients"]
            print("Ingredients: ", obj["ingredients"])

            recipe.steps = obj["steps"]
            print("Steps: ", obj["steps"])

            recipe.difficulty_level = obj["difficulty_level"]
            print("Difficulty Level: ", obj["difficulty_level"])

            recipe.spicy_level = obj["spicy_level"]
            print("Spicy Level: ", obj["spicy_level"])

            recipe.meal_type = obj["meal_type"]
            print("Meal Type: ", obj["meal_type"])

            recipe.save()

            print("AI Response: ", obj)

            return Response({"message": "Generate Recipe Successfully!", "data": obj}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
