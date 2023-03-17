const apiGateWayUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/api/v1" : "";

const endPoints = {
  signIn: `${apiGateWayUrl}/signIn`,
  register: `${apiGateWayUrl}/signUp`,
  createTodo: `${apiGateWayUrl}/createTodo`,
  updateTodo: `${apiGateWayUrl}/updateTodo`,
  findTodo: `${apiGateWayUrl}/getTodoList`,
  deleteTodo: `${apiGateWayUrl}/deleteTodo`,
};

export default endPoints;
