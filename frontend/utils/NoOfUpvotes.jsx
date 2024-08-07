

export const NoOfUpvotes = async (id) => {
   try {
    const res = await fetch(`http://localhost:8000/api/qsn/getNoOfUpvotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      }),
    })
    const data = await res.json()
    return data
   
   } catch (error) {
    
   }

}