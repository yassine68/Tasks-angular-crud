import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(private http: HttpClient) {}

	private tasksUrl: string = 'http://localhost:5622/tasks';

	getAll() {
		return this.http.get<Task[]>(this.tasksUrl);
	}
	delete(id: number) {
		return this.http.delete<Task>(`${this.tasksUrl}/${id}`);
	}
	// persist (Add new Item)
	persist(task: Task) {
		return this.http.post<Task>(this.tasksUrl, task);
	}
	complete(id: number, completed: boolean) {
		return this.http.patch<Task>(`${this.tasksUrl}/${id}`, {
			completed: completed
		}); // we use patch method to update one or more fileds
	}

	edit(task: Task) {
		return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task);
	}
}
