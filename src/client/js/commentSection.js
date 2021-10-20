import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete-comment");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.className = "delete-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.videoid;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  const { newCommentId } = await response.json();
  if (response.status === 201) {
    addComment(text, newCommentId);
  }
  // window.location.reload();
};

const handleDelete = async (event) => {
  const comment = event.target.parentNode;
  console.log(comment);
  const commentId = comment.dataset.id;
  const { status } = await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
  });
  if (status === 201) {
    comment.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteBtns.forEach((item) => {
  item.addEventListener("click", handleDelete);
});
