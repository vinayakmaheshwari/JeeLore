import { toast } from "react-toastify";

export const isUpvotedByUser = async (userId, qsnId) => {
  const res = await fetch(`http://localhost:8000/api/qsn/getQsnById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: qsnId,
    }),
  });
  const data = await res.json();
  if (data.upvotedBy.includes(userId)) {
    return true;
  } else {
    return false;
  }
};

export const upvote = async (qsnId) => {
  const res = await fetch(`http://localhost:8000/api/qsn/upvote/${qsnId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
  });
  const data = await res.json();
  toast(data.msg);
};
