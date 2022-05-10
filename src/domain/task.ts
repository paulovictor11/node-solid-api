interface ITaskProps {
    title: string;
    projectId: string;
    assignedTo: string;
    completed: boolean;
}

export class Task {
    private props: ITaskProps;
    private _id?: string;

    get id(): string {
        return this._id!;
    }

    get title(): string {
        return this.props.title;
    }

    get projectId(): string {
        return this.props.projectId;
    }

    get assignedTo(): string {
        return this.props.assignedTo;
    }

    get completed(): boolean {
        return this.props.completed;
    }

    constructor(props: ITaskProps, id?: string) {
        this.props = props;
        this._id = id;
    }
}
