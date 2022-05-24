import { Router } from "express";
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

// ! User routes
routes
    .route("/users")
    .get(new ListAllUsersController().handle)
    .post(new CreateUserController().handle);

routes
    .route("/users/:id")
    .get(new FindUserByIdController().handle)
    .put(new UpdateUserController().handle)
    .delete(new DeleteUserController().handle);

// ! Project routes
routes
    .route("/projects")
    .get(new ListAllProjectsController().handle)
    .post(new CreateProjectController().handle)
    .post(new FindProjectByTitleController().handle);

routes
    .route("/projects/:id")
    .get(new FindProjectByIdController().handle)
    .put(new UpdateProjectController().handle)
    .delete(new DeleteProjectController().handle);

// ! Task routes
routes
    .route("/tasks")
    .get(new ListAllTasksController().handle)
    .post(new CreateTaskController().handle)
    .post(new FindTaskByTitleController().handle);

routes
    .route("/tasks/:id")
    .get(new FindTaskByIdController().handle)
    .put(new UpdateTaskController().handle)
    .delete(new DeleteTaskController().handle);
