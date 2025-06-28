import axios from "axios";
import { useState } from "react";

function Recipe() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [spicyLevel, setSpicyLevel] = useState("");
  const [mealType, setMealType] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRecipe, setHasRecipe] = useState(false);
  const [generatedRecipeName, setGeneratedRecipeName] = useState("");

  const URL = "http://127.0.0.1:8000/api/recipe/";

  async function handleRecipeGenerate(e) {
    e.preventDefault();
    if (!recipeName.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(URL, { recipe_title: recipeName });
      console.log("Response: ", response.data);

      const {
        difficulty_level,
        ingredients,
        meal_type,
        spicy_level,
        steps,
        recipe_name,
      } = response.data.data;
      setDifficultyLevel(difficulty_level);
      setIngredients(ingredients);
      setMealType(meal_type);
      setSpicyLevel(spicy_level);
      setSteps(steps);
      setGeneratedRecipeName(recipe_name);
      setHasRecipe(true);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #fff3e0 0%, #ffebee 100%)",
      }}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <i className="bi bi-chef-hat fs-1 text-warning me-3"></i>
            <h1 className="display-4 fw-bold text-dark mb-0">
              AI Recipe Generator
            </h1>
          </div>
          <p className="lead text-muted">
            Transform your recipe ideas into detailed cooking instructions
          </p>
        </div>
        {/* Input Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleRecipeGenerate}>
                  <div className="mb-4">
                    <label
                      htmlFor="recipeName"
                      className="form-label fw-semibold text-dark"
                    >
                      What recipe would you like to create?
                    </label>
                    <input
                      id="recipeName"
                      type="text"
                      value={recipeName}
                      onChange={(e) => setRecipeName(e.target.value)}
                      placeholder="e.g., Spicy Chicken Tikka, Chocolate Cake, Pasta Carbonara..."
                      className="form-control form-control-lg border-2"
                      style={{ borderColor: "#fd7e14" }}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !recipeName.trim()}
                    className="btn btn-lg w-100 text-white fw-semibold position-relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #fd7e14 0%, #dc3545 100%)",
                      border: "none",
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Generating Recipe...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-magic me-2"></i>
                        Generate Recipe
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Recipe Display */}
        {hasRecipe && (
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                {/* Recipe Header */}
                <div
                  className="card-header text-white p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #fd7e14 0%, #dc3545 100%)",
                  }}
                >
                  <h2 className="card-title fw-bold mb-3 fs-2">
                    {generatedRecipeName}
                  </h2>
                  <div className="d-flex flex-wrap gap-3">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-speedometer2 me-2 text-light"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">
                          Difficulty
                        </small>
                        <span className="fw-semibold">{difficultyLevel}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-fire me-2 text-light"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">
                          Spice Level
                        </small>
                        <span className="fw-semibold">{spicyLevel}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-utensils me-2 text-light"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">
                          Meal Type
                        </small>
                        <span className="fw-semibold">{mealType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="row g-4">
                    {/* Ingredients Section */}
                    <div className="col-lg-6">
                      <h3 className="fw-bold text-dark mb-4 d-flex align-items-center">
                        <i className="bi bi-list-ul text-warning me-2 fs-4"></i>
                        Ingredients
                      </h3>
                      <div className="list-group list-group-flush">
                        {ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="list-group-item border-0 bg-light rounded-3 mb-2 p-3"
                          >
                            <div className="fw-semibold text-dark">
                              {ingredient.ingredient_name}
                            </div>
                            <small className="text-muted">
                              <i className="bi bi-dash-circle me-1"></i>
                              {ingredient.ingredient_quantity}{" "}
                              {ingredient.ingredient_unit}
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Steps Section */}
                    <div className="col-lg-6">
                      <h3 className="fw-bold text-dark mb-4 d-flex align-items-center">
                        <i className="bi bi-chef-hat text-warning me-2 fs-4"></i>
                        Instructions
                      </h3>
                      <div className="steps-container">
                        {steps.map((step, index) => (
                          <div
                            key={index}
                            className="border-start border-warning border-4 ps-3 pb-4 mb-3"
                          >
                            <div className="d-flex align-items-center mb-2">
                              <span
                                className="badge bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {step.step}
                              </span>
                              <span className="fw-semibold text-dark">
                                Step {step.step}
                              </span>
                            </div>
                            <p className="text-dark mb-2">{step.instruction}</p>
                            {step.optional_tip && (
                              <div className="alert alert-info border-0 rounded-3 py-2 px-3 mb-0">
                                <div className="d-flex align-items-center">
                                  <i className="bi bi-lightbulb text-info me-2"></i>
                                  <strong className="text-info">
                                    Pro Tip:
                                  </strong>
                                </div>
                                <small className="text-info mt-1 d-block">
                                  {step.optional_tip}
                                </small>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Recipe;
