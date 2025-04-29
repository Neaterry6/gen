import os
from flask import Flask, request, jsonify
from diffusers import DiffusionPipeline
import torch

# Initialize Flask App
app = Flask(__name__)

# Load AI Model (Optimized for Low Memory)
model_id = "runwayml/stable-diffusion-v1-5"
pipe = DiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)  # ✅ Uses half precision to reduce RAM usage
pipe.to("cpu")  # Running on CPU (Change to "cuda" if using GPU)

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
    PORT = int(os.getenv("PORT", 5000))  # Ensures Render binds to the correct port
    app.run(host="0.0.0.0", port=PORT, debug=True)
