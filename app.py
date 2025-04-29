import os
from flask import Flask, request, jsonify
from diffusers import StableDiffusionPipeline

# Initialize Flask App
app = Flask(__name__)

# Load AI Model (Stable Diffusion)
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id)
pipe.to("cpu")  # Running on CPU (Change to "cuda" for GPU)

@app.route("/generate-image", methods=["POST"])
def generate_image():
    """Generates AI-powered images based on user prompts."""
    data = request.json
    prompt = data.get("prompt", "A futuristic city at sunset")

    if not prompt:
        return jsonify({"error": "❌ No prompt provided!"}), 400

    # Generate Image
    image = pipe(prompt).images[0]
    image_path = f"static/{prompt.replace(' ', '_')}.png"
    image.save(image_path)

    return jsonify({"image": image_path})

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 5000))  # Ensures Flask binds to Render/Vercel correctly
    app.run(host="0.0.0.0", port=PORT, debug=True)
