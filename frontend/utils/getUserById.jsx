import { useState } from "react";

export const getUserById = async (id) => {
  
  try {
    const res = await fetch(`http://localhost:8000/api/auth/getUserById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await res.json();
    return JSON.stringify(data);
  } catch (error) {}
};
