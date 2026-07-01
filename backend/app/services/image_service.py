import os
import uuid
import shutil

from fastapi import HTTPException, UploadFile


# =====================================================
# Upload Configuration
# =====================================================

UPLOAD_DIR = "uploads"

ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp"
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


# =====================================================
# Create Upload Folder
# =====================================================

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


# =====================================================
# Validate Extension
# =====================================================

def allowed_file(filename: str) -> bool:

    if "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()

    return extension in ALLOWED_EXTENSIONS


# =====================================================
# Save Uploaded Image
# =====================================================

def save_image(image: UploadFile | None) -> str | None:

    if image is None:
        return None

    if image.filename is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid image filename."
        )

    if not allowed_file(image.filename):
        raise HTTPException(
            status_code=400,
            detail="Unsupported image format. Use JPG, JPEG, PNG or WEBP."
        )

    extension = image.filename.rsplit(".", 1)[1].lower()

    filename = f"{uuid.uuid4().hex}.{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            image.file,
            buffer
        )

    return filename


# =====================================================
# Delete Image
# =====================================================

def delete_image(filename: str | None):

    if not filename:
        return

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    if os.path.exists(filepath):
        os.remove(filepath)


# =====================================================
# Image URL
# =====================================================

def image_path(filename: str | None):

    if filename is None:
        return None

    return f"/uploads/{filename}"