export const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty date string
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };