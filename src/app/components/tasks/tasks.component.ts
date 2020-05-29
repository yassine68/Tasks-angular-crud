import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { $ } from 'protractor';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: [ './tasks.component.css' ]
})
export class TasksComponent implements OnInit {
	private tasks: Task[] = new Array();

	get Tasks() {
		return this.tasks;
	}

	constructor(private taskService: TaskService) {}

	ngOnInit(): void {
		this.getTasks();
	}

	getTasks() {
		this.taskService.getAll().subscribe(
			(res) => {
				this.tasks = res;
				this.resultTasks = res;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	deleteTask(task: Task) {
		this.taskService.delete(task.id).subscribe(
			(res) => {
				console.log(res);
				let index = this.tasks.indexOf(task);
				this.tasks.splice(index, 1);
				// we can use filter function
				// this.tasks = this.tasks.filter((task) => (task.id! = task.id));
			},
			(err) => {
				console.log(err);
			}
		);
	}
	AsCompleted(task: Task) {
		this.taskService.complete(task.id, !task.completed).subscribe(
			(res) => {
				//let index = this.tasks.indexOf(task);
				//this.tasks[index]['completed'] = !task['completed'];
				task.completed = !task.completed;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	newTask: Task = {
		completed: false,
		label: ''
	};

	public operation: boolean = true;
	public showForm: boolean = false;

	persistTask() {
		this.showForm = false;

		if (!this.operation) {
			this.taskService.edit(this.newTask).subscribe(
				(res) => {
					this.newTask = {
						label: '',
						completed: false
					};
				},
				(err) => {
					console.log(err);
				}
			);
			this.operation = !this.operation;
			return;
		}
		this.taskService.persist(this.newTask).subscribe(
			(res) => {
				console.log(res);
				this.tasks = [ res, ...this.tasks ]; // sprit operator
				this.initiTask();
			},
			(err) => {
				console.log(err);
			}
		);
	}

	initiTask() {
		this.newTask.completed = false;
		this.newTask.label = '';
	}

	editTask(task: Task) {
		this.showForm = true;
		this.operation = false;
		this.newTask = task;
	}

	newTaskMethod() {
		this.showForm = !this.showForm;
		this.newTask = {
			completed: false,
			label: ''
		};
		this.operation = true;
	}

	public searchText: string = '';
	resultTasks: Task[] = [];
	searchTasks() {
		this.resultTasks = this.tasks.filter((task) => task.label.toUpperCase().includes(this.searchText.toUpperCase()));
	}
}
