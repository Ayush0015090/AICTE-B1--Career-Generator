# ==========================================
# Career Compass AI
# Career Readiness Predictor
# Using Decision Tree Classifier
# ==========================================

from sklearn.tree import DecisionTreeClassifier

# ------------------------------------------
# Training Dataset
# [Skills Count, Weekly Study Hours]
# ------------------------------------------

X = [
    [1, 2],
    [2, 4],
    [3, 5],
    [4, 8],
    [5, 10],
    [6, 12],
    [7, 15],
    [8, 18],
    [9, 20],
    [10, 25]
]

# Career Readiness Labels

y = [
    "Beginner",
    "Beginner",
    "Beginner",
    "Intermediate",
    "Intermediate",
    "Advanced",
    "Advanced",
    "Advanced",
    "Industry Ready",
    "Industry Ready"
]

# ------------------------------------------
# Train Model
# ------------------------------------------

model = DecisionTreeClassifier(random_state=42)

model.fit(X, y)

# ------------------------------------------
# Student Input
# ------------------------------------------

skills_count = int(input("Enter number of skills known: "))
study_hours = int(input("Enter weekly study hours: "))

# ------------------------------------------
# Prediction
# ------------------------------------------

prediction = model.predict(
    [[skills_count, study_hours]]
)

print("\n==============================")
print("Career Compass AI Prediction")
print("==============================")
print("Career Readiness Level:")
print(prediction[0])

# ------------------------------------------
# Confidence Message
# ------------------------------------------

if prediction[0] == "Beginner":
    print("Focus on learning fundamentals and building mini projects.")

elif prediction[0] == "Intermediate":
    print("Build portfolio projects and start applying for internships.")

elif prediction[0] == "Advanced":
    print("Prepare for interviews and strengthen your GitHub profile.")

else:
    print("You are close to industry readiness. Focus on placements and networking.")