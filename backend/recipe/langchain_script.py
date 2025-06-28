from pydantic import BaseModel, Field
from typing import List, Literal, Annotated, Optional
from decouple import config
import json
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI


class Ingredient(BaseModel):
    ingredient_name: Annotated[str, Field(..., description="Name of the ingredient, e.g., 'Paneer Tikka'")]
    ingredient_quantity: Annotated[int, Field(..., description="Quantity of the ingredient, e.g., 2")]
    ingredient_unit: Annotated[str, Field(..., description="Unit for the ingredient quantity, e.g., 'cups', 'grams'")]

class Step(BaseModel):
    step: Annotated[int, Field(..., description="Step number in the recipe sequence")]
    instruction: Annotated[str, Field(..., description="Instruction for this cooking step")]
    time: Annotated[str, Field(..., description="Time required to complete this step, e.g., '5 mins'")]
    optional_tip: Annotated[Optional[str], Field(None, description="Optional tip for better results in this step")]

class Recipe(BaseModel):
    ingredients: Annotated[List[Ingredient], Field(..., description="List of all ingredients used in the recipe")]
    steps: Annotated[List[Step], Field(..., description="Step-by-step cooking instructions")]
    difficulty_level: Annotated[Literal["Beginner", "Intermediate", "Advanced"], Field(..., description="Difficulty level of the recipe")]
    spicy_level: Annotated[Literal["Low", "Medium", "High"], Field(..., description="Spice level of the recipe")]
    meal_type: Annotated[Literal["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"], Field(..., description="Select the most suitable meal type based on the recipe name")]

def recipe_generate(recipe_name):

    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key=config("GOOGLE_API_KEY"))

    prompt = PromptTemplate(
    template="Generate a full recipe structure for the following dish: {recipe_name}. "
    "Include ingredients (with name, quantity, and unit), steps (step number, instruction, time, and optional tip), "
    "difficulty level, spicy level, meal type, preparing time, cooking time, total time, and estimated cost.",
    input_variables=["recipe_name"],
    )

    chain = prompt | model.with_structured_output(Recipe)

    response = chain.invoke({"recipe_name": recipe_name})

    final_result = response.model_dump_json()

    recipe_info = json.loads(final_result)

    recipe_info["recipe_name"] = recipe_name

    return recipe_info
