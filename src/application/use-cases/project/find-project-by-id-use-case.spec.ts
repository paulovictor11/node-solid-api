import { Project } from "../../../domain/project";
import { Task } from "../../../domain/task";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { FindProjectByIdUseCase } from "./find-project-by-id-use-case";

const makePrismaProjectRespository = new PrismaProjectRepository();
const makeSut = new FindProjectByIdUseCase(makePrismaProjectRespository);

const projectSpy = {
    title: "Test Find",
    description: "Lorem ipsum",
    userId: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
};

const makePrismaTaskRepository = new PrismaTaskRepository();
const taskSpy = {
    title: "Test Create Task",
    projectId: "",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Find project by id use case", () => {
    afterAll(async () => {
        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        if (task) {
            await makePrismaTaskRepository.delete(task.id);
        }

        const project = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );
        if (project) {
            await makePrismaProjectRespository.delete(project.id);
        }
    });

    it("should throw an error if no project id is provided", async () => {
        const promise = makeSut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should return empty array of tasks when no tasks is add to the project", async () => {
        await makePrismaProjectRespository.create(new Project(projectSpy));

        const searchedProject = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );
        const project = await makeSut.execute(searchedProject!.id);

        expect(project.tasks).toStrictEqual([]);
    });

    it("should return empty array with tasks", async () => {
        await makePrismaProjectRespository.create(new Project(projectSpy));

        const searchedProject = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );

        taskSpy.projectId = searchedProject!.id;
        await makePrismaTaskRepository.create(new Task(taskSpy));

        const project = await makeSut.execute(searchedProject!.id);

        expect(project.tasks.length).toBe(1);
    });

    it("should return a project when a valid id is provided", async () => {
        await makePrismaProjectRespository.create(new Project(projectSpy));

        const searchedProject = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );
        const project = await makeSut.execute(searchedProject!.id);

        expect(project).toStrictEqual(searchedProject);
    });
});
