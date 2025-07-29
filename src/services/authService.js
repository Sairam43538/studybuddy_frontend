export async function getCurrentUser() {
  // Temporary mock: simulate a logged-in student
  return Promise.resolve({
    id: "123",
    username: "JohnDoe",
    role: "STUDENT", // Change to ADMIN, TEACHER, MODERATOR for testing
  });
}
