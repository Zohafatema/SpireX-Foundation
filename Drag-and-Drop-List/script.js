
const taskList = document.getElementById("taskList");
const resetBtn = document.getElementById("resetBtn");
const itemCount = document.getElementById("itemCount");
const progressBar = document.getElementById("progressBar");

const originalOrder = [...taskList.children].map(item => item.dataset.id);

let draggedItem = null;

// Update numbering after every reorder
function updateList() {
  const items = [...taskList.querySelectorAll(".task-item")];

  items.forEach((item, index) => {
    const number = item.querySelector(".task-number");
    number.textContent = String(index + 1).padStart(2, "0");
  });

  itemCount.textContent =
    `${items.length} tasks · Drag to reorder`;

  progressBar.style.width =
    `${items.length ? 100 : 0}%`;
}

// Enable drag-and-drop interactions
taskList.addEventListener("dragstart", event => {
  const item = event.target.closest(".task-item");
  if (!item) return;

  draggedItem = item;
  item.classList.add("dragging");

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", item.dataset.id);
});

taskList.addEventListener("dragover", event => {
  event.preventDefault();

  const target = event.target.closest(".task-item");

  if (!target || !draggedItem || target === draggedItem) {
    return;
  }

  // Find whether the pointer is above or below the target midpoint
  const rect = target.getBoundingClientRect();
  const after = event.clientY > rect.top + rect.height / 2;

  taskList.querySelectorAll(".drag-over").forEach(item => {
    item.classList.remove("drag-over");
  });

  target.classList.add("drag-over");

  if (after) {
    target.after(draggedItem);
  } else {
    target.before(draggedItem);
  }
});

taskList.addEventListener("drop", event => {
  event.preventDefault();

  taskList.querySelectorAll(".drag-over").forEach(item => {
    item.classList.remove("drag-over");
  });

  updateList();
});

taskList.addEventListener("dragend", () => {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
  }

  taskList.querySelectorAll(".drag-over").forEach(item => {
    item.classList.remove("drag-over");
  });

  draggedItem = null;
  updateList();
});

// Reset to the original order
resetBtn.addEventListener("click", () => {
  const items = [...taskList.querySelectorAll(".task-item")];

  items.sort((a, b) => {
    return originalOrder.indexOf(a.dataset.id) -
           originalOrder.indexOf(b.dataset.id);
  });

  items.forEach(item => taskList.appendChild(item));
  updateList();
});

// Initial display
updateList();
