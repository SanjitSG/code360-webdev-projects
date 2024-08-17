document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;
  let images = JSON.parse(localStorage.getItem("storedImagesData")) || [];

  // Dropzone functionality
  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", function (e) {
    handleFiles(e.target.files);
  });

  function handleFiles(files) {
    if (files.length + images.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= 1048576) {
        displayFile(file);
      } else {
        alert("File must be an image and less than 1 MB.");
      }
    });
  }

  function displayFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = file.name;
      img.className = "thumbnail";
      div.appendChild(img);

      const textarea = document.createElement("textarea");
      textarea.className = "description";
      textarea.placeholder = "Add a description...";
      div.appendChild(textarea);

      const deleteIcon = document.createElement("span");
      deleteIcon.className = "delete-icon";
      deleteIcon.textContent = "X";
      div.appendChild(deleteIcon);

      fileList.appendChild(div);

      // Add to images array and save to localStorage
      const imgData = {
        src: e.target.result,
        description: "",
      };
      images.push(imgData);
      saveToLocalStorage();

      // Update description and save
      textarea.addEventListener("input", function () {
        imgData.description = textarea.value;
        saveToLocalStorage();
      });

      // Delete functionality
      deleteIcon.addEventListener("click", function () {
        images = images.filter((i) => i.src !== imgData.src);
        div.remove();
        saveToLocalStorage();
      });
    };

    reader.readAsDataURL(file);
  }

  // Function to load the data from localStorage
  function loadFromLocalStorage() {
    const storedImagesData = JSON.parse(localStorage.getItem("storedImagesData") || "[]");
    console.log("Loaded from localStorage:", storedImagesData);
    storedImagesData.forEach((data) => {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = data.src;
      img.className = "thumbnail";
      div.appendChild(img);

      const textarea = document.createElement("textarea");
      textarea.className = "description";
      textarea.value = data.description;
      div.appendChild(textarea);

      const deleteIcon = document.createElement("span");
      deleteIcon.className = "delete-icon";
      deleteIcon.textContent = "X";
      div.appendChild(deleteIcon);

      fileList.appendChild(div);

      // Add event listeners
      textarea.addEventListener("input", function () {
        data.description = textarea.value;
        saveToLocalStorage();
      });

      deleteIcon.addEventListener("click", function () {
        images = images.filter((i) => i.src !== data.src);
        div.remove();
        saveToLocalStorage();
      });
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem("storedImagesData", JSON.stringify(images));
  }

  loadFromLocalStorage();
});
