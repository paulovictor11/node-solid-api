import { Task } from "./task";

interface IProjectProps {
    title: string;
    description: string;
    userId: string;
    tasks?: Task[];
}

export class Project {
    private props: IProjectProps;
    private _id?: string;

    get id(): string {
        return this._id!;
    }

    get title(): string {
        return this.props.title;
    }

    get description(): string {
        return this.props.description;
    }

    get userId(): string {
        return this.props.userId;
    }

    get task(): Task[] {
        return this.props.tasks ?? [];
    }

    constructor(props: IProjectProps, id?: string) {
        this.props = props;
        this._id = id;
    }
}
