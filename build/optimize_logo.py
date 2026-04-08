from PIL import Image, ImageDraw, ImageFont
import os

# === CONFIG ===
input_file = "logo.png"               # Original logo file
output_file = "logo_optimized.png"    # Output file
text_to_add = "RetraiteClair"         # Text to add
target_size = (1200, 630)             # Recommended for social sharing

# Check if input file exists
if not os.path.isfile(input_file):
    print(f"Error: '{input_file}' not found in the current folder.")
    exit(1)

# Open the image
img = Image.open(input_file)

# Resize image to target size while keeping aspect ratio
img.thumbnail(target_size, resample=Image.Resampling.LANCZOS)

# Create a Draw object
draw = ImageDraw.Draw(img)

# Try using Arial font, fallback to default
try:
    font = ImageFont.truetype("arial.ttf", size=80)
except:
    font = ImageFont.load_default()

# Calculate text size using textbbox
bbox = draw.textbbox((0, 0), text_to_add, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

# Center the text horizontally, place near top
x = (img.width - text_width) // 2
y = 20  # 20 px from top

# Draw shadow for visibility
draw.text((x+3, y+3), text_to_add, font=font, fill="black")
# Draw main text
draw.text((x, y), text_to_add, font=font, fill="white")

# Save optimized image
img.save(output_file, optimize=True, quality=85)
print(f"Optimized image saved as '{output_file}' ({img.width}x{img.height}px)")
