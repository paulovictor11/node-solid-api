import crypto from "crypto";
import { Project } from "../../../domain/project";
import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryProjectRepository } from "../../../tests/repositories/InMemoryProjectRepository";
import { InMemoryTaskRepository } from "../../../tests/repositories/InMemoryTaskRepository";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { FindProjectByIdUseCase } from "./find-project-by-id-use-case";

const makeSut = () => {
    const taskRepository = new InMemoryTaskRepository();
    const repository = new InMemoryProjectRepository();
    const sut = new FindProjectByIdUseCase(repository);

    return {
        taskRepository,
        repository,
        sut,
    };
};

const projectSpy = {
    id: crypto.randomUUID(),
    title: "Test Find",
    description: "Lorem ipsum",
    userId: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
};

const taskSpy = {
    id: crypto.randomUUID(),
    title: "Test Create Task",
    projectId: "",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Find project by id use case", () => {
    it("should throw an error if no project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should throw an error if an invalid project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should return empty array of tasks when no tasks is add to the project", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new Project({ ...projectSpy }, projectSpy.id));

        const project = await sut.execute(projectSpy.id);

        expect(project.tasks).toStrictEqual([]);
    });

    it("should return an array with tasks", async () => {
        const { sut, repository } = makeSut();
        const task = new Task(taskSpy);
        await repository.create(
            new Project({ ...projectSpy, tasks: [task] }, projectSpy.id)
        );

        const searchedProject = await repository.findByTitle(projectSpy.title);
        const project = await sut.execute(searchedProject!.id);

        expect(project.tasks.length).toBe(1);
    });

    it("should return a project when a valid id is provided", async () => {
        const { sut, repository } = makeSut();
        const project = new Project(projectSpy, projectSpy.id);
        await repository.create(project);

        const result = await sut.execute(projectSpy.id);

        expect(project.description).toBeTruthy();
        expect(project.userId).toBeTruthy();
        expect(result).toStrictEqual(project);
    });
});
