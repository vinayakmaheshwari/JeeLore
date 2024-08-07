import { useState } from "react";

export const getUserById = async (id) => {
  
  try {
    const res = await fetch(`https://backend.jeelore.site/api/auth/getUserById`, {
      method: "POST",
      credentials: "include",
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
