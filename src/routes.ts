import { Router } from "express";
import { LoginController } from "./application/controllers/auth/login-controller";
import {
    CreateProjectController,
    DeleteProjectController,
    FindProjectByIdController,
    ListAllProjectsController,
    UpdateProjectController,
} from "./application/controllers/project";
import { FindProjectByTitleController } from "./application/controllers/project/find-project-by-title-controller";
import {
    CreateTaskController,
    DeleteTaskController,
    FindTaskByIdController,
    ListAllTasksController,
    UpdateTaskController,
} from "./application/controllers/task";
import { FindTaskByTitleController } from "./application/controllers/task/find-task-by-title-controller";
import {
    CreateUserController,
    DeleteUserController,
    FindUserByIdController,
    ListAllUsersController,
    UpdateUserController,
} from "./application/controllers/user";

export const routes = Router();

// ! Authentication routes
routes.post("/login", new LoginController().handle);

// ! User routes
routes
    .route("/users")
    .get(new ListAllUsersController().handle)
    .post(new CreateUserController().handle);

routes
    .route("/user/:id")
    .get(new FindUserByIdController().handle)
    .put(new UpdateUserController().handle)
    .delete(new DeleteUserController().handle);

// ! Project routes
routes
    .route("/projects")
    .get(new ListAllProjectsController().handle)
    .post(new CreateProjectController().handle);

routes
    .route("/project/:id")
    .get(new FindProjectByIdController().handle)
    .put(new UpdateProjectController().handle)
    .delete(new DeleteProjectController().handle);

routes.post("/project/title", new FindProjectByTitleController().handle);

// ! Task routes
routes
    .route("/tasks")
    .get(new ListAllTasksController().handle)
    .post(new CreateTaskController().handle);

routes
    .route("/task/:id")
    .get(new FindTaskByIdController().handle)
    .put(new UpdateTaskController().handle)
    .delete(new DeleteTaskController().handle);

routes.post("/task/title", new FindTaskByTitleController().handle);
